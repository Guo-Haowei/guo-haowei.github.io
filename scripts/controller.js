var app = angular.module('Portfolio', []);

app.controller('appCtrl', function ($scope) {
    $scope.currentPage = 0;
    $scope.currentPort = getdata();
    $scope.totalPage = 5;
    $scope.count = 0;
});

const getdata = () => {
    const cards = [
        {
            href: 'https://github.com/Guo-Haowei/BitboardX',
            img: 'project-chess.png',
            title: 'BitbordX',
            body: 'A rust chess engine'
        },
        {
            href: 'https://github.com/Guo-Haowei/cc',
            img: 'project-cc.png',
            title: 'C Compiler',
            body: 'A self-hosting C Compiler'
        },
        {
            href: 'https://github.com/Guo-Haowei/c.c',
            img: 'project-c.png',
            title: 'C Interpreter',
            body: 'A self-hosting C interpreter in 1000 lines'
        },
        {
            href: 'https://github.com/Guo-Haowei/GLSL-Path-Tracer',
            img: 'project-glsl.png',
            title: 'GLSL Path Tracer',
            body: 'GLSL Path Tracer written in C++'
        },
        {
            href: 'https://github.com/Guo-Haowei/VCT',
            img: 'project-vct.png',
            title: 'Voxel Cone Tracing',
            body: 'Implementation of Voxel Cone Tracing with OpenGL and C++'
        },
        {
            href: 'https://github.com/Guo-Haowei/Rasterizer',
            img: 'project-sr.png',
            title: 'Software Rasterizer',
            body: 'Software Rasterizer written in C++ to learn how Graphics API work'
        },
        {
            href: 'https://github.com/Guo-Haowei/PBR',
            img: 'project-pbr.png',
            title: 'PBR',
            body: 'Implementing Physically based rendering with morden graphics API'
        },
        {
            href: 'https://github.com/Guo-Haowei/TheAviator',
            img: 'project-the-aviator.png',
            title: 'The Aviator',
            body: 'My first game written with OpenGL and C++'
        },
        {
            href: 'pages/SuperCaveBoy/index.html',
            img: 'project-super-caveboy.png',
            title: 'Super Cave Boy',
            body: 'A 2D platformer game written in JavaScript'
        },
        {
            href: 'pages/TurnBasedGame/index.html',
            img: 'project-turn-based.png',
            title: 'Turn Based Game',
            body: 'A turn based RPG game written in JavaScript'
        }
    ];
    let cardList = [];
    for (let i = 0; i < cards.length; i += 1) {
        if (i % 3 === 0) {
            cardList.push([]);
        }
        cardList[cardList.length - 1].push(cards[i]);
    }

    return cardList;
};
