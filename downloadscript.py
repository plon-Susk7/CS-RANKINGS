import requests
from bs4 import BeautifulSoup
import os

website_url = "https://www.nirfindia.org/2023/EngineeringRanking.html"

response = requests.get(website_url)

soup = BeautifulSoup(response.text, "html.parser")

# Find all <a> tags with href attributes containing ".pdf"
pdf_links = soup.find_all("a", href=lambda href: href and href.endswith(".pdf"))


os.makedirs("pdf_files", exist_ok=True)

# Download each PDF file
for link in pdf_links:
    file_url = link["href"]
    file_name = file_url.split("/")[-1]
    file_path = os.path.join("pdf_files", file_name)

    # Send a GET request to download the file
    pdf_response = requests.get(file_url)

    # Save the file to the specified path
    with open(file_path, "wb") as file:
        file.write(pdf_response.content)
        print(f"Downloaded: {file_path}")
