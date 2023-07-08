import tabula

def create_data_frame(filename):
    try:
        pdf_tables = tabula.read_pdf(f"../pdf_files/{filename}.pdf",pages="all",multiple_tables=True)    
        return pdf_tables
    except:
        return None
    
def modify_headers(filename):
    pdf_tables = create_data_frame(filename)
    if pdf_tables==None:
        return None
    for table in pdf_tables:
        headers = table.columns.values.tolist()
        final_headers=[]
        for i in headers:
            header = " ".join(i.split("\r"))
            final_headers.append(header)
        table.columns=final_headers
    return pdf_tables

def add_to_dictionary(table,year):
    dictionary=table.to_dict()
    dictionary.pop("(All programs of all years)")
    if year==4:
        return {"UG Four Year":dictionary}
    elif year==5:
        return {"UG Five Year":dictionary}
    elif year==6:
        return {"PG Two Year":dictionary}
    elif year==7:
        return {"PG Three Year":dictionary}
    elif year==8:
        return {"PG Integrated":dictionary}
    else:
        return {}
def get_ug_pg_data(filename,year):
    dataframe = modify_headers(filename)
    if dataframe==None:
        return None
    students_ug_pg_table = dataframe[1]
    four_year_ug_data={"UG Four Year":{}}
    five_year_ug_data={"UG Five Year":{}}
    two_year_pg_data={"PG Two Year":{}}
    three_year_pg_data={"PG Three Year":{}}
    integrated_pg_data={"PG Integrated":{}}
    for i in range(0,len(students_ug_pg_table)):
        if students_ug_pg_table.iloc[i]["(All programs of all years)"]=="UG [4 Years\rProgram(s)]":
            four_year_ug_data = add_to_dictionary(students_ug_pg_table.iloc[i],4)
        elif students_ug_pg_table.iloc[i]["(All programs of all years)"]=="UG [5 Years\rProgram(s)]":
            five_year_ug_data = add_to_dictionary(students_ug_pg_table.iloc[i],5)
        elif students_ug_pg_table.iloc[i]["(All programs of all years)"]=="PG [2 Year\rProgram(s)]":
            two_year_pg_data = add_to_dictionary(students_ug_pg_table.iloc[i],6)
        elif students_ug_pg_table.iloc[i]["(All programs of all years)"]=="PG [3 Year\rProgram(s)]":
            three_year_pg_data = add_to_dictionary(students_ug_pg_table.iloc[i],7)
        elif students_ug_pg_table.iloc[i]["(All programs of all years)"]=="PG-Integrated":
            integrated_pg_data=add_to_dictionary(students_ug_pg_table.iloc[i],8)

    if year==4:
        return [four_year_ug_data,five_year_ug_data]
    else:
        return [two_year_pg_data,three_year_pg_data,integrated_pg_data]


def get_phd_data(filename):
    dataframe = modify_headers(filename)
    if dataframe==None:
        return None
    count=0
    for table in dataframe:
        headers = table.columns.values.tolist()
        if headers[0]=='Ph.D (Student pursuing doctoral program till 2021-22)':
            break
        else:
            count=count+1

    student_phd_data = dataframe[count].to_dict()
    phd_pursuing_students={"PHD Pursuing":{}}
    phd_graduated_students={"PHD Graduated":{"Full Time":{},"Part Time":{}}}
    phd_pursuing_students["PHD Pursuing"]["Full Time"]=student_phd_data["Unnamed: 0"][1]
    phd_pursuing_students["PHD Pursuing"]["Part Time"]=student_phd_data["Unnamed: 0"][2]
    phd_graduated_students["PHD Graduated"]["Full Time"][student_phd_data["Unnamed: 0"][4]]=student_phd_data["Unnamed: 0"][5]
    phd_graduated_students["PHD Graduated"]["Full Time"][student_phd_data["Unnamed: 1"][4]]=student_phd_data["Unnamed: 1"][5]
    phd_graduated_students["PHD Graduated"]["Full Time"][student_phd_data["Unnamed: 2"][4]]=student_phd_data["Unnamed: 2"][5]
    phd_graduated_students["PHD Graduated"]["Part Time"][student_phd_data["Unnamed: 0"][4]]=student_phd_data["Unnamed: 0"][6]
    phd_graduated_students["PHD Graduated"]["Part Time"][student_phd_data["Unnamed: 1"][4]]=student_phd_data["Unnamed: 1"][6]
    phd_graduated_students["PHD Graduated"]["Part Time"][student_phd_data["Unnamed: 2"][4]]=student_phd_data["Unnamed: 2"][6]    
    return [phd_pursuing_students,phd_graduated_students]