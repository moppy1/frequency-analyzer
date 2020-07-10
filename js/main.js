class App
{
  constructor()
  {
    this.getUiElements();
    this.initControlButtons();
    this.initMicAsync();
    this.m_highestFreq = 0;
    this.m_maxFreqValue = 5000;
    this.m_hold = true;
    this.updateControlButtons();
  }
  getUiElements()
  {
    this.m_maxFreqDisplay = $('#maxFreqDisplay');
    this.m_liveFreqBar = $('#liveFreqBar');
    this.m_startBtn = $('#startBtn');
    this.m_pauseBtn = $('#pauseBtn');
    this.m_resetBtn = $('#resetBtn');
    this.m_uilog = $('#log')
  }
  initMicAsync()
  {     
    navigator.mediaDevices.getUserMedia({video: false, audio: true})
      .then((stream) => 
      {
        this.process(stream)
      })
      .catch((err) =>
      {
        console.log(err)
      });
  }
  
  initMicSync()
  {
    navigator.getUserMedia =  
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    navigator.getUserMedia({video: false, audio: true}, stream => this.process(stream), console.log);
  }
  process(stream)
  {
    let isWebkit = false;
    try
    {
      isWebkit = webkitAudioContext != undefined;
    }
    catch(err) {}
    
    let ctxX = isWebkit ? webkitAudioContext : AudioContext;
    let ctx = new ctxX();
    let mic = ctx.createMediaStreamSource(stream);
    let analyser = ctx.createAnalyser();
    let osc = ctx.createOscillator();
  
    mic.connect(analyser);
    //osc.connect(ctx.destination);
    //osc.start(0);
  
    let data = new Uint8Array(analyser.frequencyBinCount);
    
    let doAnalyzing = () => 
    {
      if(this.m_hold)
      {
        requestAnimationFrame(doAnalyzing);
        return
      }  
        

      analyser.getByteFrequencyData(data);
      
  
      // get fullest bin
      let idx = 0;
      for (let j = 0; j < analyser.frequencyBinCount; j++) 
      {
        if (data[j] > data[idx]) 
          idx = j;
      }
  
      let frequency = idx * ctx.sampleRate / analyser.fftSize;
      if (frequency >  this.m_highestFreq) 
      {
        this.m_highestFreq = frequency;        
      }
      
     
      this.updateUi(frequency);

      //osc.frequency.value = frequency;
  
      requestAnimationFrame(doAnalyzing);
    }
  
    doAnalyzing();
  }

  updateUi(frequency, forceUpdate)
  {
    let percentage = frequency/this.m_maxFreqValue * 100;
    this.m_liveFreqBar
      .css('width', percentage+'%')
      .attr('aria-valuenow',frequency)
      .text(frequency.toFixed(1)+'Hz')

    if(frequency == this.m_highestFreq || forceUpdate)
      this.m_maxFreqDisplay.text(this.m_highestFreq.toFixed(1)+'Hz')
  }

  initControlButtons()
  {
    this.m_startBtn.bind('click', e =>
    {
      this.m_hold = false;
      this.updateControlButtons();
    })
    this.m_pauseBtn.bind('click', e =>
    {
      this.m_hold = true;
      this.updateControlButtons();
    })
    
    this.m_resetBtn.bind('click', e =>
    {
      this.m_highestFreq = 0;
      this.updateUi(0, true);
      this.updateControlButtons();
    })
  }
  updateControlButtons()
  {
    this.m_startBtn.toggleClass('disabled', !this.m_hold);
    this.m_pauseBtn.toggleClass('disabled', this.m_hold);
  }
}

$(document).ready( () => new App() );