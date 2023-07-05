import csv
import os
import tabula
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def overall_ranking(request):
    if request.method == 'GET':
        # Read the CSV file
        with open('./api/data.csv', 'r') as csv_file:
            csv_data = csv.DictReader(csv_file)

            # Convert CSV data to a list of dictionaries
            json_data = [row for row in csv_data]

            # Return the JSON response
            return Response(json_data)
        

@api_view(['GET'])
def get_placement_ug(request, id):
    if request.method == 'GET':
        # Read the CSV file
        pdf_file_path = f'../pdf_files/{id}.pdf'
        if not os.path.isfile(pdf_file_path):
            return Response({'message': 'No data found for the given id'}, status=404)

        tables = tabula.read_pdf(pdf_file_path, pages='all', multiple_tables=True)

        if(len(tables) < 3):
            return Response({'message': 'Table not found or invalid table index'}, status=404)
                            
        third_table = tables[2]  # Assuming index 2 corresponds to the third table
        json_data = third_table.to_dict(orient='records')
        return Response(json_data)




@api_view(['GET'])
def get_placement_pg(request,id):
    if request.method == 'GET':
        # Read the CSV file
        pdf_file_path = f'../pdf_files/{id}.pdf'
        if not os.path.isfile(pdf_file_path):
            return Response({'message': 'No data found for the given id'}, status=404)

        tables = tabula.read_pdf(pdf_file_path, pages='all', multiple_tables=True)
        
        if(len(tables) < 4):
            return Response({'message': 'Table not found or invalid table index'}, status=404)
              
        third_table = tables[3]  # Assuming index 2 corresponds to the third table
        json_data = third_table.to_dict(orient='records')
        return Response(json_data)



        

