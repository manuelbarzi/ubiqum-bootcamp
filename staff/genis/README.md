//Bash 
cd {dirección} // desplazarte
cd ..// ir hacía atrás en el repertorio de carpetas. 
mkdir {carpeta}//crear carpeta
touch {nombre del archivo} // crear un archivo
git init - crea un repositorio remoto
git clone - crea un repositorio local clonado de uno remoto
git rm -r {archivo/carpeta} // eliminar archivo o carpeta
git rm -rf .git // eliminar git

//Branches
git branch {nombre de la branch} // crea branch
git branch {nombre de la branch} HEAD^^//crea branch 2 commits anteriores al HEAD
git checkout -b {nombre de la branch} // crea branch y se posiciona en ella, es decir, hace checkout
git merge {branch de origen} {branch de destino} // Fusiona una branch con otra, y al hacerlo crea  un nuevo commit con los cambios incorporados (el commit más reciente)
git rebase {branch de destino} {branch de origen} // mueve una branch en otra 
git cherry-pick {commits/branch que queremos copiar}// copia branches/commits en donde estemos situados, pero no eliminar los commits originales. 
git branch -a // lista de branches remotas y locales

//Git 
git log // nos da una lista de los commits. Se puede ver de forma resumida con git log --oneline
git add . // añade todos los archivos del folder de tu repositorio local a la staggering area. También se puede añadir archivos en particular git add {archivo}
git commit -m {nombre del commit} //  crea un commit y le da un nombre
git checkout {branch/comit} //Nos situaremos en el commit o branch que le indiquemos
git revert {commit targe } // elimina el commit seleccionado (C1), revierte al anterior  que le indiques (CO) y hace una copia de éste último (C2)
git reset --hard {commit target} // Deshace los cambios (el commit C2) moviendo al referencia una rama hacia atrás, a un commit anterior (C1). Al contrario que el comando git revert, git reset no crea ningún commit nuevo


//Trabajar con Github
root@Laptop-G:/mnt/c/Users/genis/desktop/folders/prueba2# git clone https://github.com/GM89/ubiqum-bootcamp.git
git pull origin {branch destino}// importas una branch en particular del repositorio remoto al local 
git pull // importas tu repositorio remoto al repositorio local
git push -u origin {branch}// exportas una branch en particular del repositorio local al repositorio remoto.
git pull // exportas tu repositorio local al repositorio remoto
git pull//importar el repositorio remoto

