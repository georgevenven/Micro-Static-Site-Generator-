// Simple Process: 
// 1. Go through all the files in articles, select the ones that are valid ( are markdown files)
// 2. Convert each of them to valid html
// 3. Take that valid HTML string, and insert into the Jinja pages template
// 4. Thats it!
const YAML = require('yaml')
const njk = require('nunjucks')

function generate_pages(){
    // generate all pages from /pages that are not base.njk or page.njk

    // get the path of the /pages, which stores all the markdown files
    const path=require('path');
    let pages_dir=path.join(__dirname,'../', 'pages');
    console.log(pages_dir);//move one step back from current directory

    // for loop through all the files in the pages directory
    const fs=require('fs');
    fs.readdir(pages_dir,(err,files)=>{
        if(err){
            console.log(err);
        }
        else{
            files.forEach(file=>{
                // check if the file is a base or page file
                if(path.extname(file)=='.njk' && file!='base.njk' && file!='page.njk'){

                    //LEFT OFF HERE 
                    nunjucks.configure('views', { autoescape: true });
                    nunjucks.render('index.html', { foo: 'bar' });
                }
            })
        }
    }
    )


}

function generate_articles(YAML, md){
}

function markdown_to_html(markdown){
    // split the markdown file into yaml and markdown

    for (var i = 2; i < markdown.length; i++) {
        if(markdown[i]=='-' && markdown[i+1]=='-' && markdown[i+2]=='-'){
            end_of_yaml=i;
            break;
        }
    }
    // get the yaml part
    yaml=markdown.substring(0,end_of_yaml);
    // get the markdown part
    md=markdown.substring(end_of_yaml+3,markdown.length);

    // individual yaml variables can be accessed with the . operator
    parsed_YAML = YAML.parse(yaml);
    // now we have the yaml and the markdown, we can convert into jinja 

    generate_pages(parsed_YAML,md);
}

// generate the base pages first
generate_pages()

// get the path of the /articles, which stores all the markdown files 
const path=require('path');
let articles_dir=path.join(__dirname,'../', 'articles');
console.log(articles_dir);//move one step back from current directory

// for loop through all the files in the articles directory
const fs=require('fs');
fs.readdir(articles_dir,(err,files)=>{
    if(err){
        console.log(err);
    }
    else{
        files.forEach(file=>{
            // check if the file is a markdown file
            if(path.extname(file)=='.md'){
                dir = path.join(articles_dir, file);
                var str = fs.readFileSync(dir, "utf8");
                markdown_to_html(str);
            }
            else{
                console.log(file + ' is not a valid file');
            }
        })
    }
}
)

// find out how to link media 

// var showdown  = require('showdown'),
//     converter = new showdown.Converter(),
//     text      = '# hello, markdown!',
//     html      = converter.makeHtml(text);

// console.log(html)