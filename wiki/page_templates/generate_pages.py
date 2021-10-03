import os

cwd=os.getcwd()
out_folder=cwd+"/../real_pages"
if not os.path.exists(out_folder):
    os.mkdir(out_folder)
    
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
    
    generated_html_code=""
    with open(html_center_file,"r") as html_center_file:
        for line in html_center_file.readlines():
            line=line.lstrip().rstrip()
            if line[0:2]=="{{":
                assert(line[-2:]=="}}")
                to_be_inserted_filename=line[2:-2]

                if to_be_inserted_filename=="IGEM_TopBar":
                    continue
                elif to_be_inserted_filename in {"template_top.html","template_bottom.html"}:
                    generated_html_code+="\n"+open("reference/"+to_be_inserted_filename,"r").read()+"\n"
                else:
                    generated_html_code+="\n"+open(folder+"/"+to_be_inserted_filename,"r").read()+"\n"
            else:
                generated_html_code+="\n"+line
    
    out_file=out_folder+"/"+folder+".html"
    if os.path.exists(out_file):
        os.remove(out_file)
    open(out_file,"w+").write(generated_html_code)
        