import csv

def create_file_reader(filename):
    try:
        file = open(f"../csv_files/{filename}.csv")
        reader = csv.reader(file)
        return reader
    except:
        print("In Except")
        return None
def modify_rows(filename):
    reader = create_file_reader(filename)
    if reader==None:
        return []
    finalRows = []
    for row in reader:
        modifiedRows=[]
        for i in row:
            modifiedRow=" ".join(i.split("\n"))
            modifiedRows.append(modifiedRow)
        finalRows.append(modifiedRows)
    return finalRows

def get_UG_PG_data(filename,year):
    rows = modify_rows(filename)
    if rows==[]:
        return None
    count=0 
    innerCount=0
    FourYearUG={}
    FiveYearUG={}
    TwoYearPG={}
    ThreeYearPG={}
    IntegratedPG={}
    headers = []
    for row in rows:
        print(row)
        if len(row)==0:
            count=count+1
            continue
        if count==1:
            if innerCount==0:
                innerCount=innerCount+1
                headers=row
                continue
            else:
                if row[0]=="UG [4 Years Program(s)]":
                    for i in range(1,len(headers)):
                        FourYearUG[headers[i]]=int(row[i])
                elif row[0]=="UG [5 Years Program(s)]":
                    for i in range(1,len(headers)):
                        FiveYearUG[headers[i]]=int(row[i])
                elif row[0]=="PG [2 Year Program(s)]":
                    for i in range(1,len(headers)):
                        TwoYearPG[headers[i]]=int(row[i])
                elif row[0]=="PG [3 Year Program(s)]":
                        for i in range(1,len(headers)):
                            ThreeYearPG[headers[i]]=int(row[i])
                elif row[0]=="PG-Integrated":
                    for i in range(1,len(headers)):
                        IntegratedPG[headers[i]]=int(row[i])

    UG_Data = {"Four Year UG":FourYearUG,"Five Year UG":FiveYearUG}
    PG_Data = {"Two Year PG":TwoYearPG,"Three Year PG":ThreeYearPG,"Integrated PG":IntegratedPG}
    if year==4:
        return UG_Data
    else:
        return PG_Data

def get_PHD_data(filename):
    rows = modify_rows(filename)
    if rows==[]:
        return None
    count=0
    innerCount=0
    years=[]
    PHD={"Total Students":{},"No of PHD Students graduated":{}}
    for row  in rows:
        if len(row)==0:
            count=count+1
            continue
        if count==4:
            if innerCount==2 or innerCount==3:
                PHD["Total Students"][row[0]]=int(row[1])
                PHD["Total Students"][row[0]]=int(row[1])
                innerCount=innerCount+1
            elif innerCount==5:
                years=row
                for i in range(1,len(row)):
                    PHD["No of PHD Students graduated"][row[i]]={}
                innerCount=innerCount+1
            elif innerCount==6:
                for i in range(1,len(row)):
                    PHD["No of PHD Students graduated"][years[i]][row[0]]=int(row[i])
            else:
                innerCount=innerCount+1
    print(PHD)
    return PHD