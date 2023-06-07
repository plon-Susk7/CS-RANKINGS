import csv
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
        

