class Todo {
  constructor( title , content ){
    this.title = title;
    this.content = content;
    this.completed = false;
    this.timestamp = Date.now();
  }

  getTitle(){
    return this.title;
  }
  setTitle( title ){
    this.title = title;
  }
  getContent(){
    return this.content;
  }
  setContent( content ){
    this.content = content;
  }
  isCompleted(){
    return this.completed;
  }
  setCompleted( completed ){
    this.completed = completed;
  }
  getTimestamp(){
    return this.timestamp;
  }
  setTimestamp( timestamp ){
    this.timestamp = timestamp;
  }
}
