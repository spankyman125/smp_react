import { URLMAIN_STATIC } from "./Consts";

export class Player {
  //TODO event listener on song pause\resumed event (caused by client, pause\play at iphone, etc) 
  //TODO change audio.src instead of creating new one, would fix continuos playback on ios 

  static playerContext = null;
  static setPlayerContext = null;

  static clear = (queue) => {
    this.playerContext.audio.pause();
    this.setPlayerContext({
      ...this.playerContext,
      queue: {
        songs:[],
        position:-1,
      },
      isPlaying: false,
      audio: null
    });
    console.log("Queue cleared", queue); 
  }

  static replace = (queue) => {
    const newAudio = 
      queue.songs[queue.position].id === this.playerContext.queue.songs[this.playerContext.queue.position]?.id?
      this.playerContext.audio
      :
      this.switchAudio(queue.songs[queue.position]);
    this.setPlayerContext({
      ...this.playerContext,
      audio: newAudio,
      queue: queue
    });
    console.log("Queue changed to", queue); 
  }

  static insert = (song, position) => {
    this.setPlayerContext({
      ...this.playerContext, 
      audio: (this.playerContext.queue.position===-1? this.switchAudio(song):this.playerContext.audio),
      queue: {
        ...this.playerContext.queue,
        position: (this.playerContext.queue.position===-1? 0 : this.playerContext.queue.position),
        songs: [
          ...this.playerContext.queue.songs.slice(0, position),
          song,
          ...this.playerContext.queue.songs.slice(position),
        ]
      },
    });
    console.log(song, "added to queue at position", position); 
  }

  static remove = (position) => {
    if(this.playerContext.queue.songs[position]) {
      
      let currentPosition = this.playerContext.queue.position;
      let newPosition = -1;
      
      if(position < currentPosition)
        newPosition = currentPosition - 1;
        
      if(position === currentPosition)
        if(position === this.playerContext.queue.songs.length - 1)
          newPosition =  currentPosition - 1;
        else
          newPosition =  currentPosition;

      if(position > currentPosition)
        newPosition = currentPosition;

      if(newPosition === -1) {
        this.clear();
        return true;
      }

      this.setPlayerContext({
        ...this.playerContext, 
        audio: this.switchAudio(this.playerContext.queue.songs[newPosition]) ,
        queue: {
          ...this.playerContext.queue,
          position: newPosition,
          songs: this.playerContext.queue.songs.filter((song, i) => i !== position)
        }
      });
      console.log("Song at position", position, "removed from queue",); 
      return true;
    }
    else {
      console.log("Wrong position to remove", position); 
      return false;
    }
  }

  static unshift = (song) => {
    this.insert(song, 0);
  }

  static push = (song) => {
    this.insert(song, this.playerContext.queue.songs.length);
  }

  static switchAudio = (song) => {
    const onSongEnded = (event) => {
      if(!this.next()) {
        this.pause();
        console.log('Queue is empty');
      }
    }

    if(this.playerContext.audio) {
      this.playerContext.audio.removeEventListener('ended', onSongEnded);
      this.playerContext.audio.pause(); //pause previous audio
    }

    let newAudio = new Audio(URLMAIN_STATIC + song.file_url);
    newAudio.addEventListener('ended', onSongEnded);
    newAudio.load();
    
    if(this.playerContext.isPlaying) {
      newAudio.play() //Continuos playing
    }
    return newAudio
  }

  static switchTo = (position) => {
    if(this.playerContext.queue.songs[position]) {  
      this.setPlayerContext({
        ...this.playerContext,
        audio: this.switchAudio(this.playerContext.queue.songs[position]), 
        queue: {
          ...this.playerContext.queue,
          position: position,
        }
      });
      console.log("Switched to position", position)
      return true
    }
    else {
      console.log("Can't switch to position", position)
      return false
    }
  } 

  static next = () => {
    return this.switchTo(this.playerContext.queue.position + 1);
  } 

  static prev = () => {
    return this.switchTo(this.playerContext.queue.position - 1);
  } 

  static pause = () => {
    this.playerContext.audio.pause();
    this.setPlayerContext({
      ...this.playerContext,
      isPlaying: false,
    });
    console.log("Song paused");
  }

  static play = () => {
    this.playerContext.audio.play();
    this.setPlayerContext({
      ...this.playerContext,
      isPlaying: true,
    });
    console.log("Song resumed");
  }

  static togglePlay = () => {
    this.playerContext.isPlaying? this.pause() : this.play();
  }

}
