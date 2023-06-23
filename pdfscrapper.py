import tabula as tb
import pandas as pd
import os


csv_file_path = 'combined_tables.csv'
file = 'example.pdf' #need to change this and make it dynamic

df_list = tb.read_pdf(file, pages='all')
if(os.path.exists(csv_file_path)):
    os.remove('combined_tables.csv')

for i, df in enumerate(df_list):

    df.to_csv(csv_file_path,mode='a' ,index=False)  # Save DataFrame as CSV
    
    blank_row = pd.DataFrame([[]])
    blank_row.to_csv(csv_file_path, mode='a', index=False, header=False)