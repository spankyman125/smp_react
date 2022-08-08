export class Player {

  static setQueue = (playerContext, setPlayerContext, queue) => {
    let contextClone = {...playerContext}
    contextClone.queue = queue;
    console.log("Queue changed to",contextClone.queue); 
    setPlayerContext(contextClone);
  }

  static addToQueue = (playerContext, setPlayerContext, song) => {
    let contextClone = {...playerContext}
    contextClone.queue.songs.push(song);
    console.log(song, "added to queue",); 
    console.log("Queue changed to",contextClone.queue); 
    setPlayerContext(contextClone);
  }

  static next = (playerContext, setPlayerContext) => {
    if(playerContext.queue.songs[playerContext.queue.position+1]) {  
      console.log("Switched to next song")
      playerContext.queue.position += 1;
      this.setQueue(playerContext, setPlayerContext, playerContext.queue);
      return true
    }
    else {
      console.log("No next song")
      return false
    }
  } 

  static prev = (playerContext, setPlayerContext) => {
    if(playerContext.queue.songs[playerContext.queue.position-1]){
      console.log("Switched to prev song")
      playerContext.queue.position -= 1;
      this.setQueue(playerContext, setPlayerContext,playerContext.queue);
      return true;
    }
    else {
      console.log("No prev song")
      return false
    }
  } 

  static pause = (playerContext, setPlayerContext) => {
    playerContext.isPlaying = false;
    console.log("Audio paused");
    setPlayerContext({...playerContext});
  }

  static resume= (playerContext, setPlayerContext) => {
    if(playerContext.queue.songs[playerContext.queue.position]) {
      playerContext.isPlaying = true;
      console.log("Audio resumed");
      setPlayerContext({...playerContext});
    }
  }

  static togglePlay = (playerContext, setPlayerContext) => {
    playerContext.isPlaying ? this.pause(playerContext, setPlayerContext) : this.resume(playerContext, setPlayerContext);
  }
}
