export interface ITodo {
  text: string;
  completed: boolean;
}

export interface ITodoList {
  date: string;
  todo: ITodo[]
}
