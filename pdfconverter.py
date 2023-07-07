import tabula as tb
import pandas as pd
import os
from tabula.io import read_pdf

#First run downloadscript.py to download the pdf files

pdf_folder_path = 'pdf_files'
csv_folder_path = 'csv_files'


for filename in os.listdir(pdf_folder_path):
    csv_file_path = os.path.join(csv_folder_path,filename.split('.')[0] + '.csv')
    file = os.path.join(pdf_folder_path, filename)

   
    os.makedirs(csv_folder_path, exist_ok=True)

    df_list = tb.read_pdf(file, pages='all')
    for i, df in enumerate(df_list):

        df.to_csv(csv_file_path,mode='a' ,index=False)  # Save DataFrame as CSV
        
        blank_row = pd.DataFrame([[]])
        blank_row.to_csv(csv_file_path, mode='a', index=False, header=False)
        print(f"Converted page {i + 1} of {filename} to {csv_file_path}")
