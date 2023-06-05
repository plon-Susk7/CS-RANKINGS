from selenium import webdriver
from bs4 import BeautifulSoup
import csv


#pip install selenium
#pip install beautifulsoup4


driver = webdriver.Chrome()

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
    
    result.append(temp)


    
csv_file_path = 'data.csv'
header = ['Institute ID','Name','TLR(100)','RPC(100)','GO(100)','OI(100)','PERCEPTION(100)','City','State','Score','Rank']
# Open the CSV file in write mode
with open(csv_file_path, mode='w', newline='') as file:
    # Create a CSV writer object
    writer = csv.writer(file)

    writer.writerow(header)
    # Write the data to the CSV file row by row
    for row in result:
        writer.writerow(row)

print('Data has been written to', csv_file_path)
