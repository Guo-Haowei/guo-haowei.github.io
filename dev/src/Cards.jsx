const Card = ({ title, body, image, link }) => {
 return (
  <div className="col-sm-4 card" ng-if="x.length >= 1">
    <a href={link}>
      <img src={image} style={{ width: '100%' }} className="w3-hover-opacity w3-margin-top" />
    </a>
    <br/>
    <br/>
    <div className="w3-container w3-padding-16 w3-white w3-card-2 w3-round" style={{ textAlign: 'center' }} >
      <h4><b>{title}</b></h4>
      <p>{body}</p>
    </div>
  </div>
 )
};

const Cards = () => {
  const cards = [
    {
      link: 'https://github.com/Guo-Haowei/BitboardX',
      image: 'project-chess.png',
      title: 'BitbordX',
      body: 'A rust chess engine'
    },
    {
      link: 'https://github.com/Guo-Haowei/cc',
      image: 'project-cc.png',
      title: 'C Compiler',
      body: 'A self-hosting C Compiler'
    },
    {
      link: 'https://github.com/Guo-Haowei/c.c',
      image: 'project-c.png',
      title: 'C Interpreter',
      body: 'A self-hosting C interpreter in 1000 lines'
    },
    {
      link: 'https://github.com/Guo-Haowei/GLSL-Path-Tracer',
      image: 'project-glsl.png',
      title: 'GLSL Path Tracer',
      body: 'GLSL Path Tracer written in C++'
    },
    {
      link: 'https://github.com/Guo-Haowei/VCT',
      image: 'project-vct.png',
      title: 'Voxel Cone Tracing',
      body: 'Implementation of Voxel Cone Tracing with OpenGL and C++'
    },
    {
      link: 'https://github.com/Guo-Haowei/Rasterizer',
      image: 'project-sr.png',
      title: 'Software Rasterizer',
      body: 'Software Rasterizer written in C++ to learn how Graphics API work'
    },
    {
      link: 'https://github.com/Guo-Haowei/PBR',
      image: 'project-pbr.png',
      title: 'PBR',
      body: 'Implementing Physically based rendering with morden graphics API'
    },
    {
      link: 'https://github.com/Guo-Haowei/TheAviator',
      image: 'project-the-aviator.png',
      title: 'The Aviator',
      body: 'My first game written with OpenGL and C++'
    },
    {
      link: 'pages/SuperCaveBoy/index.html',
      image: 'project-super-caveboy.png',
      title: 'Super Cave Boy',
      body: 'A 2D platformer game written in JavaScript'
    },
    {
      link: 'pages/TurnBasedGame/index.html',
      image: 'project-turn-based.png',
      title: 'Turn Based Game',
      body: 'A turn based RPG game written in JavaScript'
    }
  ];

  return (
    <div>
      {
      cards.map((card, i) => (
        <Card
          key={i}              // unique key for React
          title={card.title}
          body={card.body}
          image={card.image}
          link={card.link}
        />
      ))
      }
    </div>
  )
};

export default Cards;
