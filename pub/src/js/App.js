class App{

    constructor(){
        this.works = worksArr.reduce((ret, item, i) => {
                item.index = i;
                ret[item.slug] = item;
                return ret;
            }, {});

        this.doc = document.documentElement;
        this.portfolioContainer = $('#portfolio-details');

        //sections
        this.$home = $('#home');
        this.$navbar = $('#navbar');
        this.$sections = $($('.section-content').get().reverse());

        $('.no-js').removeClass('no-js');
        this.addListeners();

        if ( window.location.hash !== '' && window.location.hash.indexOf('project') !== -1 )
            this.parseHash();
    }

    addListeners(){
        $(window).on('hashchange', this.parseHash.bind(this));
        $('.skill-overview').on('mouseover', this.onSkillMouseOver.bind(this));
        //$('.portfolio-item').on('click', this.onPortfolioItemClick.bind(this));
        $('#close-project').on('click', this.closePortfolio.bind(this));
        $('nav a, .scroll').on('click', this.onNavClick.bind(this));
        $(window).on('scroll', this.onPageScroll.bind(this));
    }

    onSkillMouseOver(evt){
        $('.skill-container').hide();
        $('.' + evt.currentTarget.getAttribute('ref')).show();
    }

    updatePortfolioSelection(item){
        $('#portfolio-wrap').show();
        $('body').css('overflow', 'hidden');
        const
            prev = item.index - 1 < 0 ? worksArr.length-1 : item.index- 1,
            next = item.index + 1 > worksArr.length-1 ? 0 : item.index+1;

        $('#prev-project').attr('href', '#!projects/' + worksArr[prev].slug);
        $('#next-project').attr('href', '#!projects/' + worksArr[next].slug);

        this.portfolioContainer.find('.title').text(item.title);
        this.portfolioContainer.find('.date span').text(item.info.date);
        this.portfolioContainer.find('.company span').text(item.info.company);
        this.portfolioContainer.find('.tags span').text(item.info.categories.join(', '));

        const $demoUrl = this.portfolioContainer.find('.demo');
        if ( typeof item.info.client !== 'undefined' ){
            this.portfolioContainer.find('.client').show();
            this.portfolioContainer.find('.client span').text(item.info.client);
        } else
            this.portfolioContainer.find('.client').hide();

        if ( typeof item.info.url !== 'undefined' ){
            $demoUrl.show();
            $demoUrl.find('a').attr('href', item.info.url);
            $demoUrl.find('a').text(item.info.url);

        } else
            $demoUrl.hide();

        this.portfolioContainer.find('.description').html(item.description);
        this.portfolioContainer.find('.images').empty();

        item.gallery.forEach(i => {
            this.portfolioContainer.find('.images').append('<img src="/dist/images/portfolio/'+item.slug+'/gallery/'+i+'" />')
        })

    }

    closePortfolio(){
        $('#portfolio-wrap').hide();
        $('body').css('overflow', 'visible');
        //return false;
    }

    parseHash(){
        console.log(window.location.hash);
        if ( window.location.hash.indexOf('project') > -1 ) {
            const slug = window.location.hash.split('/').pop();
            this.updatePortfolioSelection(this.works[slug]);
        }
    }

    onNavClick(evt){
        const
            elemTop     = $($(evt.currentTarget).attr('href')).offset().top - this.$navbar.height(),
            diff        = Math.abs(elemTop - $(window).scrollTop()),
            duration    = Math.round(Math.sqrt(diff)) * 8;
        $('nav .active').removeClass('active');
        $(evt.currentTarget).addClass('active');
        $('html,body').stop().animate({scrollTop: elemTop }, duration);
        return false;
    }

    onPageScroll(){
        const scrollTop = $(window).scrollTop();

        // Check if the nav should have a background yet
        if ( scrollTop > 25)
            this.$navbar.removeClass('no-background');
        else
            this.$navbar.addClass('no-background');


        $('nav .active').removeClass('active');
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            $('[href="#contact"]').addClass('active');
        } else {
            this.$sections.each((i, elem) => {
                const elemTop = $(elem).offset().top - (this.$navbar.height() * 2);
                if (elemTop < scrollTop) {
                    if ( $(elem).attr('id') !== 'home' )
                        $('[href="#' + $(elem).attr('id') + '"]').addClass('active');
                    return false;
                }

            })
        }


    }
}

new App();



