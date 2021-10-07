import os

cwd=os.getcwd()
out_folder=cwd+"/../real_pages"
if not os.path.exists(out_folder):
    os.mkdir(out_folder)
    
reference_file_list=set()
for file in os.listdir("reference"):
    if os.path.isfile("reference/"+file):
        reference_file_list.add(file)

def resolve_templates(input,folder):
    output=""
    for line in input:
        line=line.lstrip().rstrip()
        if line[0:2]=="{{":
            assert(line[-2:]=="}}")
            to_be_inserted_filename=line[2:-2]

            if to_be_inserted_filename=="IGEM_TopBar":
                #forwarded into actual code because it is an iGEM intrinsic template
                output+="{{IGEM_TopBar}}\n"
            elif to_be_inserted_filename in reference_file_list:
                output+="\n"+open("reference/"+to_be_inserted_filename,"r",encoding="utf-8").read()+"\n"
            else:
                output+="\n"+open(folder+"/"+to_be_inserted_filename,"r",encoding="utf-8").read()+"\n"
        else:
            output+="\n"+line

    return output

for folder in os.listdir(cwd):
    if folder=="reference":
        continue

    full_folder=cwd+"/"+folder

    if not os.path.isdir(full_folder):
        continue

    print(folder+" found")
    files_in_dir={}

    html_center_file=full_folder+"/"+folder+".html"
    if not os.path.exists(html_center_file):
        print(html_center_file+" does not exist in folder "+folder)
    
    with open(html_center_file,"r",encoding="utf-8") as html_center_file:
        #do it twice to resolve nested templates
        generated_html_code=resolve_templates(html_center_file.readlines(),folder)
        generated_html_code=resolve_templates(generated_html_code.splitlines(),folder)
    
    out_file=out_folder+"/"+folder+".html"
    if os.path.exists(out_file):
        os.remove(out_file)
    open(out_file,"w+",encoding="utf-8").write(generated_html_code)
        