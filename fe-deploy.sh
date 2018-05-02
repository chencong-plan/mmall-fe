#!/bin/sh
##
#使用方法 mmall-fe   front_deploy.sh mmall-fe
#使用方法 admin-fe   front_deploy.sh admin-fe
##
GIT_HOME=/developer/git-repository/
DEST_PATH=/product/frontend/

# cd dir
if [ ! -n "$1" ];
    then
    echo -e "请输入要发布的项目"
    exit
fi

if [ $1 = "mmall-fe" ];
    then
    echo -e "================Entry mmall-fe ==================="
    cd $GIT_HOME$1
elif [ $1 = "admin-fe" ];
    then
    echo -e "================Entry admin-fe ==================="
    cd $GIT_HOME$1
else
    echo -e "输入的项目名没有找到！"
    exit
fi




# clear git-repository dist
 echo -e "======================clear git dist ======================="
 rm -rf ./dist

# git 操作 git checkout master
echo -e "=======================git checkout master =================="
git  checkout master

# git 操作  git pull  拉取代码
echo -e "=======================git pull ============================="
git pull

# npm install
echo -e "========================npm install =========================="
npm install --registry=https://registry.npm.taobao.org

# npm run dist
echo -e "=====================npm  run dist ==========================="
npm run dist

if [ -d "./dist" ];
    then
    #backup dist
    echo -e "================= desk backup ============================="
    mv $DEST_PATH$1/dist $DEST_PATH$1/dist.bak

    # cp
    echo -e "================= copy dist ==============================="
    cp -R ./dist  $DEST_PATH$1

    # echo result
    echo -e "================= Deloy Success ==========================="
else
    echo -e "================= Deploy Error ============================"
fi
