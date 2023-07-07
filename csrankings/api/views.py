# Rest Framework Imports
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Other Imports
import csv
import os
import tabula
from . import reader

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
def get_placement_ug(request, *args,**kwargs):
    if request.method == 'GET':
        # Read the CSV file
        id = request.path.split("/")[3]
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
def get_placement_pg(request,*args,**kwargs):
    if request.method == 'GET':
        # Read the CSV file
        id = request.path.split("/")[3]
        pdf_file_path = f'../pdf_files/{id}.pdf'
        if not os.path.isfile(pdf_file_path):
            return Response({'message': 'No data found for the given id'}, status=404)

        tables = tabula.read_pdf(pdf_file_path, pages='all', multiple_tables=True)
        
        if(len(tables) < 4):
            return Response({'message': 'Table not found or invalid table index'}, status=404)
              
        third_table = tables[3]  # Assuming index 2 corresponds to the third table
        json_data = third_table.to_dict(orient='records')
        return Response(json_data)


@api_view(['GET'])
def UGData(request,*args,**kwargs):
    file_name = request.path.split("/")[3]
    UGStudentData = reader.get_UG_PG_data(file_name,4)
    if UGStudentData==None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(UGStudentData)

@api_view(['GET'])
def PGData(request,*args,**kwargs):
    file_name = request.path.split("/")[3]
    PGStudentData = reader.get_UG_PG_data(file_name,5)
    if PGStudentData==None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(PGStudentData)


@api_view(['GET'])
def PHDData(request,*args,**kwargs):
    file_name = request.path.split("/")[3]
    PHDStudentData = reader.get_PHD_data(file_name)
    if PHDStudentData==None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(PHDStudentData)


        

