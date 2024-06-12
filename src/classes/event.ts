export class Event {
  status: string;
  type: string;
  game: string;
  startDate: string;
  endDate: string;
  title: string;
  image: string;
  colors?: {
    primary?: string;
    secondary?: string;
    textAccent?: string;
  };

  constructor(data) {
    this.status = data.status;
    this.type = data.type;
    this.game = data.game.id;
    this.startDate = data.start;
    this.endDate = data.end;
    this.title = data.title;
    this.image = data.image;
    this.colors = data.colors;
  }
}
