class Rebel{

    constructor(){
        Rebel.getIo();
        this.background = new Background();
        this.displayInitialPage();
        this.setupEvents();
    }

    displayInitialPage(){
        document.querySelector('.page-container').style.display = 'none';
        const currentActive = document.querySelector('.page-container.active');
        if ( currentActive !== null )
            currentActive.classList.remove('active');
        const initialPage = document.querySelector('#' + (location.hash.replace(/\#/, '') || 'about')+'-container');
        initialPage.classList.add('active');
    }

    setupEvents(){
        const container = document.querySelectorAll('.page-outer-container')[0];
        window.addEventListener('hashchange', evt => {
            const
                curPage     = evt.oldURL.split('#')[1],
                nextPage    = evt.newURL.split('#')[1],
                curElem     = document.querySelector('#' + curPage+'-container'),
                nextElem    = document.querySelector('#' + nextPage+'-container');

            nextElem.style.display = 'block';
            nextElem.style.opacity = 0;
            nextElem.style.position = 'absolute';

            curElem.classList.remove('active');
                TweenLite.to(container, 0.4, {delay:0.3, height:nextElem.clientHeight,
                    onStart : () =>{
                        //curElem.style.display = 'none';
                    },
                    onComplete:()=>{
                        nextElem.classList.add('active');
                        nextElem.style.position = 'relative';

                        setTimeout(()=>{
                            curElem.style.display = 'none';
                        });
                        //container.style.height = 'auto';
                        //TweenLite.to(nextElem, 0.2, {opacity:1, onComplete : ()=>{
                        //    console.log('Everything done');
                        //}})
                    }
                });

        })
    }

    static getEvents(){
        return {
            CONNECT     : 'CONNECT',
            CONNECT_ALL : 'CONNECT_ALL',
            DISCONNECT  : 'USER_DISCONNECT',
            USER_MOVE   : 'USER_MOVE',
            SET_COLOR   : 'SET_COLOR'
        }
    }

    static getIo(){
        if ( typeof this.io === 'undefined')
            this.io = io.connect('http://localhost:3001');
        return this.io;
    }
}