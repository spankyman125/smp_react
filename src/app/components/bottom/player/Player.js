export class Player {

  static playerContext = null;
  static setPlayerContext = null;

  // static clear = (queue) => {
  //   this.setPlayerContext({
  //     ...this.playerContext,
  //     queue: {
  //       songs:[],
  //       position:0,
  //     },
  //     isPlaying: false
  //   });
  //   console.log("Queue cleared", queue); 
  // }

  static replace = (queue) => {
    this.setPlayerContext({
      ...this.playerContext,
      queue: queue
    });
    console.log("Queue changed to", queue); 
  }

  static insert = (song, position) => {
    this.setPlayerContext({
      ...this.playerContext, 
      queue: {
        ...this.playerContext.queue,
        songs: [
          ...this.playerContext.queue.songs.slice(0,position),
          song,
          ...this.playerContext.queue.songs.slice(position),
        ]
      }
    });
    console.log(song, "added to queue",); 
  }

  static remove = (position) => {
    this.setPlayerContext({
      ...this.playerContext, 
      queue: {
        ...this.playerContext.queue,
        songs: this.playerContext.queue.songs.filter((song, i) => i!==position)
      }
    });
    console.log("Song at position", position, "removed from queue",); 
  }

  static unshift = (song) => {
    this.setPlayerContext({
      ...this.playerContext, 
      queue: {
        ...this.playerContext.queue,
        songs: [
          song,
          ...this.playerContext.queue.songs,
        ]
      }
    });
    console.log(song, "unshifted",); 
  }

  static push = (song) => {
    this.setPlayerContext({
      ...this.playerContext, 
      queue: {
        ...this.playerContext.queue,
        songs: [
          ...this.playerContext.queue.songs,
          song
        ]
      }
    });
    console.log(song, "pushed",); 
  }

  static next = () => {
    if(this.playerContext.queue.songs[this.playerContext.queue.position+1]) {  
      this.setPlayerContext({
        ...this.playerContext, 
        queue: {
          ...this.playerContext.queue,
          position: this.playerContext.queue.position + 1,
        }
      });
      console.log("Switched to next song")
      return true
    }
    else {
      console.log("No next song")
      return false
    }
  } 

  static prev = () => {
    if(this.playerContext.queue.songs[this.playerContext.queue.position-1]) {  
      this.setPlayerContext({
        ...this.playerContext, 
        queue: {
          ...this.playerContext.queue,
          position: this.playerContext.queue.position - 1,
        }
      });
      console.log("Switched to prev song")
      return true
    }
    else {
      console.log("No prev song")
      return false
    }
  } 

  static pause = () => {
    if(this.playerContext.queue.songs[this.playerContext.queue.position]) {
      this.setPlayerContext({
        ...this.playerContext,
        isPlaying: false,
      });
      console.log("Song paused");
    }
  }

  static resume = () => {
    if(this.playerContext.queue.songs[this.playerContext.queue.position]) {
      this.setPlayerContext({
        ...this.playerContext,
        isPlaying: true,
      });
      console.log("Song resumed");
    }
  }

  static togglePlay = () => {
    this.playerContext.isPlaying? 
      this.pause() 
      : 
      this.resume();
  }

}
