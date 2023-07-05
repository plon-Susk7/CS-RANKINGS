import csv
import os
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
def get_placement_ug(request,id):
    if request.method == 'GET':
        # Read the CSV file
        csv_file_path = f'../csv_files/{id}.csv'
        if not os.path.isfile(csv_file_path):
            return Response({'message': 'No data found for the given id'}, status=404)

        with open(csv_file_path, 'r') as csv_file:
            csv_data = csv.DictReader(csv_file)

            # Convert CSV data to a list of dictionaries
            json_data = [row for row in csv_data]

            # Return the JSON response
            return Response(json_data)

@api_view(['GET'])
def get_placement_pg(request):
    pass


        

