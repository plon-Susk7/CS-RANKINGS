import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
import csv
from Institutes.models import Institutes

#pip install selenium
#pip install beautifulsoup4


options = Options()
options.headless=True
driver = webdriver.Chrome(options=options)

url = 'https://www.nirfindia.org/2023/EngineeringRanking.html'
driver.get(url)

html_text = driver.page_source

driver.quit()


soup = BeautifulSoup(html_text,'lxml')
rows = soup.select('tr[role="row"].even, tr[role="row"].odd')



result = []

for row in rows:
    entries = row.find_all('td')
    temp = []
    for entry in entries:
        temp.append(entry.contents[0])
    new_institute = Institutes(id=temp[0],name=temp[1],TLR=float(temp[2]),RPC=float(temp[3]),GO=float(temp[4]),OI=float(temp[5]),PERCEPTION=float(temp[6]),city=temp[7],state=temp[8],score=float(temp[9]),rank=int(temp[10]))
    new_institute.save()
    result.append(temp)


    
csv_file_path = 'data.csv'
header = ['Institute ID','Name','TLR(100)','RPC(100)','GO(100)','OI(100)','PERCEPTION(100)','City','State','Score','Rank']
# Open the CSV file in write mode
with open(csv_file_path, mode='w', newline='') as file:
    # Create a CSV writer object
    writer = csv.writer(file)
    print(result)
    writer.writerow(header)
    # Write the data to the CSV file row by row
    for row in result:
        writer.writerow(row)

print('Data has been written to', csv_file_path)