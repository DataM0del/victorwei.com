import Vector from "./Vector";
import Force from "./force";
import Rope from "./rope/Rope";
import ICursor from "./ICursor";

class Toys {
  mouse = new Vector();
  animationId: number | undefined = 0;
  then: number = performance.now();

  toys = new Map<string, ICursor>();
  selectedToy: string = "rope";

  constructor() {
    this.toys.set("rope", new Rope());
    this.toys.set("force", new Force());
  }

  start(canvas: HTMLCanvasElement) {
    if (!this.animationId) {
      this.animationId = window.requestAnimationFrame(() => {
        this.loop(canvas);
      });
    }
  }

  loop(canvas: HTMLCanvasElement) {
    this.animationId = undefined;
    const ctx = canvas.getContext("2d")!;
    let dt = 0;
    const now = performance.now();
    dt = now - this.then;

    this.then = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const toy = this.toys.get(this.selectedToy);
    if (toy) {
      toy.update(dt / 1000, this.mouse);
      toy.draw(ctx);
    }

    this.start(canvas);
  }
}

const toys = new Toys();

export default toys;
