import Letterize from "https://cdn.skypack.dev/letterizejs@2.0.0";
const test = new Letterize({
      targets: "#animateMe"
    });

    var animation = anime.timeline({
      targets: test.listAll,
      delay: anime.stagger(50),
      loop: true
    });

    animation
      .add({
        translateY: -40
      })
      .add({
        translateY: 0
      });