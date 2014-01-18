// --------------------------------
// Humbler v1.0
// by thehumblespace@gmail.com
// --------------------------------

var geocoder, map, humbleloc = new google.maps.LatLng(-34.397, 150.644), MY_MAPTYPE_ID = 'humble_style',
	$event = $.event, $special, resizeTimeout, BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
	animate = {
			'-webkit-transition': 'background-color 500ms linear',
			'-moz-transition': 'background-color 500ms linear',
			'-o-transition': 'background-color 500ms linear',
			'-ms-transition': 'background-color 500ms linear',
			'transition': 'background-color 500ms linear'
	}, 
	humbler = {
		el : {
			twt : $("#tweet"),
			section : $('section'),
			header : $('header'),
			headernav : $('header nav'),
			headernava : $('header nav a'),
			flexnormal : $('.flexslider.normal'),
			flexwide : $('.flexslider.wide'),
			flexcarousel : $('.flexslider.carousel'),
			phone : $('.phonemenu i'),
			backstretch : $('.backstretch'),
			responsivemenu : $('.phonemenu i'),
			zoom : $('a[data-rel]')
		},
		// StickyNav
		thesticky : function() {
			this.el.section.eq(1).waypoint({
				handler : function(direction) {
					$('header').toggleClass('sticky', direction=='down');
				},
				offset: 180
			});
		},
		// Flexslider
		theflex : function() {

			var transit = $('.transit'),
				transittop = $('.transit.top'),
				transitbot = $('.transit.bottom'),
				thelength = transit.length,
				theflex = $('.flexslider.wide'),
				animate = {
					'-webkit-transition': 'background-color 2000ms linear',
					'-moz-transition': 'background-color 2000ms linear',
					'-o-transition': 'background-color 2000ms linear',
					'-ms-transition': 'background-color 2000ms linear',
					'transition': 'background-color 2000ms linear'
				};

			this.el.flexnormal.flexslider({
				directionNav: false,
				slideshow: false
			});

			// Flexslider begin
			this.el.flexwide.flexslider(
				
				{	
					// Start function
					start: function(slider){

						var color = $('li.flex-active-slide').data('color'),
							bg = $('li.flex-active-slide').data('background'),
							change = {'background-color' : color};

						if(bg){
							theflex.backstretch(bg,{fade: 1000});
						} else if (color) {
							theflex.css(change).css(animate);
						}

						for (var i=1; i <= thelength; i++) {

							var delay = transit.eq(i-1).data('delay');

							if (transit.eq(i-1).hasClass('top')){
								transit.eq(i-1).animate({ top : 0 }, delay);
							} else {
								transit.eq(i-1).animate({ bottom : 0 }, delay);
							}
						}

					},

					// Before function
					before: function(slider){ 
						transittop.css({ top : -500 });
						transitbot.css({ bottom : -500 });
						$('.backstretch').not('.backstretch:last').remove();
						theflex.css('background','none');
					 },

					// After function
					after: function(slider){

						var color = $('li.flex-active-slide').data('color'),
							bg = $('li.flex-active-slide').data('background'),
							change = {'background-color' : color};
					
						if(bg){
							theflex.backstretch(bg,{fade: 1000});
						} else if (color) {
							theflex.css(change).css(animate);
						}

						for (var i=1; i <= thelength; i++) {

							var delay = transit.eq(i-1).data('delay');

							if (transit.eq(i-1).hasClass('top')){
								transit.eq(i-1).animate({ top : 0 }, delay);
							} else {
								transit.eq(i-1).animate({ bottom : 0 }, delay);
							}
						}
					},
					pauseOnHover: true,
					pauseOnAction: true,
					directionNav: false,
					slideshowSpeed: 8500
					
				}
				
			).flexsliderManualDirectionControls();

		},
		// The carousel
		thecarousel : function(){
			this.el.flexcarousel.flexslider({
				animation: "slide",
				slideshow: false, 
				directionNav: false,
				animationLoop: true,
				itemWidth: 300,
				itemMargin: 5
			});
		},
		// Responsive menu
		theresponsive : function(){
			this.el.responsivemenu.on('click', function(){
				$('header nav').slideToggle();
			});
		},
		// Scrollto
		thescroll : function(){
			this.el.headernava.not('li.visible-phone a').click(function() {
                if ($(this).attr("href") != "javascript:hidePopUp()")
                                                               {
			   var	elementClicked = $(this).attr("href"),
			   		destination = $(elementClicked).offset().top;
			   $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-80}, 500 );
                                                               
			   return false;
                                                               }
			});
		},
		// Scrollspy
		thespy : function(){
                $('body').scrollspy({target: '#navbar', offset: 180});
//            else
            
		},
		// prettyPhoto
		thepretty : function(){
			this.el.zoom.each(function() {
				$(this).attr('rel', $(this).data('rel'));
			    $('a[data-rel]').prettyPhoto({
					theme : 'light_square',
					social_tools : '',
					deeplinking: false
				});
			});
		},
		thesection : function(){
			this.el.section.each(function(){
				var thecolor = $(this).data('bgcolor');
				if(thecolor){
					$(this).css('background',thecolor).find('.title span').css('background',thecolor);
				}
			})
		},
		// Tweetjs function
		thetwitter : function(name){
			$("#tweet").tweet({
				avatar_size: 32,
				count: 1,
				username : name,
				//query: "envato",
				template: "{text} <br /><small><i class='icon-time'></i> {time}</small>",
				loading_text: "searching twitter..."
			}).bind("loaded", function() {
			    $(this).find("a").attr("target","_blank");
			});
		},
		// Backstrect
		thebackstretch : function(image){
			$.backstretch(image);
		},
		// Google map
		thegmap : function(color, icon) {
			geocoder = new google.maps.Geocoder();
			
			var featureOpts = [
			
		     	{ stylers: [
		     		{hue: color }, 
		     		{invert_lightness: false}, 
		     		{visibility: 'on'}, // Valid values: 'on', 'off' or 'simplifed'
		     		{weight: 3},
		     		{saturation: -20}, //Valid values: [-100, 100]
		     		{lightness: 0}, // Valid values: [-100, 100]
		     		{gamma: 0} //Floating point numbers, [0.01, 10], with 1.0 representing no change.
		     	] }
		    ];

		    var win = $(window).width();
			if (win < 767){
				var drag = false
			} else {
				var drag = true
			}

		    var mapOptions = {
				scrollwheel: false,
				navigationControl: false,
				mapTypeControl: false,
				scaleControl: false,
				draggable: drag,
				disableDoubleClickZoom: true,
				disableDefaultUI: true,
				zoom: 18,
				center: humbleloc,
				mapTypeControlOptions: {
		            mapTypeIds: [google.maps.MapTypeId.TERRAIN, MY_MAPTYPE_ID]
		          },
		      	mapTypeId: MY_MAPTYPE_ID
		    };
			
			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			var styledMapOptions = {
		      name: 'Humble Style'
		    };

		    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

		    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

			var address = $('#map-canvas').data('location'), 
				//iconBase = 'https://maps.google.com/mapfiles/kml/shapes/',
				myBase = {
			  		url: icon,
			  		anchor: new google.maps.Point(16, 34)
				};

			geocoder.geocode( { 'address': address}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
			    map.setCenter(results[0].geometry.location);
			    var marker = new google.maps.Marker({
			        map: map,
			        position: results[0].geometry.location,
			        icon: icon,
			        //shadow: myBase
			    });
			  } else {
			    alert('Geocode was not successful for the following reason: ' + status);
			  }
			});
		},
		theresize : function(){
			if ( $(window).width() < 767){
				$('header nav').hide();
			} else {
				$('header nav').show();
			}
		},
		init : function() {
			this.thesticky();
			this.theflex();
			this.thecarousel();
			this.theresponsive();
			this.thescroll();
			this.thespy();
			this.thepretty();
			this.thesection();
		}
	}

$special = $event.special.debouncedresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments,
			dispatch = function() {
				// set correct event type
				event.type = "debouncedresize";
				$event.dispatch.apply( context, args );
			};

		if ( resizeTimeout ) {
			clearTimeout( resizeTimeout );
		}

		execAsap ?
			dispatch() :
			resizeTimeout = setTimeout( dispatch, $special.threshold );
	},
	threshold: 250
};

$.fn.imagesLoaded = function( callback ) {
	var $this = this,
		deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
		hasNotify = $.isFunction(deferred.notify),
		$images = $this.find('img').add( $this.filter('img') ),
		loaded = [],
		proper = [],
		broken = [];

	// Register deferred callbacks
	if ($.isPlainObject(callback)) {
		$.each(callback, function (key, value) {
			if (key === 'callback') {
				callback = value;
			} else if (deferred) {
				deferred[key](value);
			}
		});
	}

	function doneLoading() {
		var $proper = $(proper),
			$broken = $(broken);

		if ( deferred ) {
			if ( broken.length ) {
				deferred.reject( $images, $proper, $broken );
			} else {
				deferred.resolve( $images );
			}
		}

		if ( $.isFunction( callback ) ) {
			callback.call( $this, $images, $proper, $broken );
		}
	}

	function imgLoaded( img, isBroken ) {
		// don't proceed if BLANK image, or image is already loaded
		if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
			return;
		}

		// store element in loaded images array
		loaded.push( img );

		// keep track of broken and properly loaded images
		if ( isBroken ) {
			broken.push( img );
		} else {
			proper.push( img );
		}

		// cache image and its state for future calls
		$.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

		// trigger deferred progress method if present
		if ( hasNotify ) {
			deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
		}

		// call doneLoading and clean listeners if all images are loaded
		if ( $images.length === loaded.length ){
			setTimeout( doneLoading );
			$images.unbind( '.imagesLoaded' );
		}
	}

	// if no images, trigger immediately
	if ( !$images.length ) {
		doneLoading();
	} else {
		$images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
			// trigger imgLoaded
			imgLoaded( event.target, event.type === 'error' );
		}).each( function( i, el ) {
			var src = el.src;

			// find out if this image has been already checked for status
			// if it was, and src has not changed, call imgLoaded on it
			var cached = $.data( el, 'imagesLoaded' );
			if ( cached && cached.src === src ) {
				imgLoaded( el, cached.isBroken );
				return;
			}

			// if complete is true and browser supports natural sizes, try
			// to check for image status manually
			if ( el.complete && el.naturalWidth !== undefined ) {
				imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
				return;
			}

			// cached images don't fire load sometimes, so we reset src, but only when
			// dealing with IE, or image is complete (loaded) and failed manual check
			// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			if ( el.readyState || el.complete ) {
				el.src = BLANK;
				el.src = src;
			}
		});
	}

	return deferred ? deferred.promise( $this ) : $this;
};

var HumblerGrid = (function() {

		// list of items
	var $grid = $( '#humbler-grid' ),
		// the items
		$items = $grid.children( 'li' ),
		// current expanded item's index
		current = -1,
		// position (top) of the expanded item
		// used to know if the preview will expand in a different row
		previewPos = -1,
		// extra amount of pixels to scroll the window
		scrollExtra = 0,
		// extra margin when expanded (between preview overlay and the next items)
		marginExpanded = 10,
		$window = $( window ), winsize,
		$body = $( 'html, body' ),
		// transitionend events
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support for csstransitions
		support = Modernizr.csstransitions,
		// default settings
		settings = {
			minHeight : 500,
			speed : 350,
			easing : 'ease'
		};

	function init( config ) {
		
		// the settings..
		settings = $.extend( true, {}, settings, config );

		// preload all images
		$grid.imagesLoaded( function() {

			// save item´s size and offset
			saveItemInfo( true );
			// get window´s size
			getWinSize();
			// initialize some events
			initEvents();

		} );

	}

	// saves the item´s offset top and height (if saveheight is true)
	function saveItemInfo( saveheight ) {
		$items.each( function() {
			var $item = $( this );
			$item.data( 'offsetTop', $item.offset().top );
			if( saveheight ) {
				$item.data( 'height', $item.height() );
			}
		} );
	}

	function initEvents() {
		
		// when clicking an item, show the preview with the item´s info and large image.
		// close the item if already expanded.
		// also close if clicking on the item´s cross
		$items.on( 'click', 'span.humbler-close', function() {
			hidePreview();
			return false;
		} ).children( 'a' ).on( 'click', function(e) {

			var $item = $( this ).parent();
			// check if item already opened
			current === $item.index() ? hidePreview() : showPreview( $item );
			return false;

		} );

		// on window resize get the window´s size again
		// reset some values..
		$window.on( 'debouncedresize', function() {
			
			scrollExtra = 0;
			previewPos = -1;
			// save item´s offset
			saveItemInfo();
			getWinSize();
			var preview = $.data( this, 'preview' );
			if( typeof preview != 'undefined' ) {
				hidePreview();
			}

		} );

	}

	function getWinSize() {
		winsize = { width : $window.width(), height : $window.height() };
	}

	function showPreview( $item ) {

		var preview = $.data( this, 'preview' ),
			// item´s offset top
			position = $item.data( 'offsetTop' );

		scrollExtra = 0;

		// if a preview exists and previewPos is different (different row) from item´s top then close it
		if( typeof preview != 'undefined' ) {

			// not in the same row
			if( previewPos !== position ) {
				// if position > previewPos then we need to take te current preview´s height in consideration when scrolling the window
				if( position > previewPos ) {
					scrollExtra = preview.height;
				}
				hidePreview();
			}
			// same row
			else {
				preview.update( $item );
				return false;
			}
			
		}

		// update previewPos
		previewPos = position;
		// initialize new preview for the clicked item
		preview = $.data( this, 'preview', new Preview( $item ) );
		// expand preview overlay
		preview.open();

	}

	function hidePreview() {
		current = -1;
		var preview = $.data( this, 'preview' );
		preview.close();
		$.removeData( this, 'preview' );
	}

	// the preview obj / overlay
	function Preview( $item ) {
		this.$item = $item;
		this.expandedIdx = this.$item.index();
		this.create();
		this.update();
	}

	Preview.prototype = {
		create : function() {
			// create Preview structure:
			this.$title = $( '<h3></h3>' );
			this.$description = $( '<p></p>' );
			this.$href = $( '<a href="#" class="btn btn-outline btn-large">Visit website</a>' );
			this.$details = $( '<div class="humbler-details"></div>' ).append( this.$title, this.$description, this.$href );
			this.$loading = $( '<div class="humbler-loading"></div>' );
			this.$fullimage = $( '<div class="humbler-fullimg"></div>' ).append( this.$loading );
			this.$closePreview = $( '<span class="humbler-close"></span>' );
			this.$previewInner = $( '<div class="humbler-expander-inner"></div>' ).append( this.$closePreview, this.$fullimage, this.$details );
			this.$previewEl = $( '<div class="humbler-expander"></div>' ).append( this.$previewInner );
			// append preview element to the item
			this.$item.append( this.getEl() );
			// set the transitions for the preview and the item
			if( support ) {
				this.setTransition();
			}
		},
		update : function( $item ) {

			if( $item ) {
				this.$item = $item;
			}
			
			// if already expanded remove class "humbler-expanded" from current item and add it to new item
			if( current !== -1 ) {
				var $currentItem = $items.eq( current );
				$currentItem.removeClass( 'humbler-expanded' );
				this.$item.addClass( 'humbler-expanded' );
				// position the preview correctly
				this.positionPreview();
			}

			// update current value
			current = this.$item.index();

			// update preview´s content
			var $itemEl = this.$item.children( 'a' ),
				eldata = {
					href : $itemEl.attr( 'href' ),
					largesrc : $itemEl.data( 'largesrc' ),
					title : $itemEl.data( 'title' ),
					description : $itemEl.data( 'description' )
				};

			this.$title.html( eldata.title );
			this.$description.html( eldata.description );
			this.$href.attr( 'href', eldata.href );

			var self = this;
			
			// remove the current image in the preview
			if( typeof self.$largeImg != 'undefined' ) {
				self.$largeImg.remove();
			}

			// preload large image and add it to the preview
			// for smaller screens we don´t display the large image (the media query will hide the fullimage wrapper)
			if( self.$fullimage.is( ':visible' ) ) {
				this.$loading.show();
				$( '<img/>' ).load( function() {
					var $img = $( this );
					if( $img.attr( 'src' ) === self.$item.children('a').data( 'largesrc' ) ) {
						self.$loading.hide();
						self.$fullimage.find( 'img' ).remove();
						self.$largeImg = $img.fadeIn( 350 );
						self.$fullimage.append( self.$largeImg );
					}
				} ).attr( 'src', eldata.largesrc );	
			}

		},
		open : function() {

			setTimeout( $.proxy( function() {	
				// set the height for the preview and the item
				this.setHeights();
				// scroll to position the preview in the right place
				this.positionPreview();
			}, this ), 25 );

		},
		close : function() {

			var self = this,
				onEndFn = function() {
					if( support ) {
						$( this ).off( transEndEventName );
					}
					self.$item.removeClass( 'humbler-expanded' );
					self.$previewEl.remove();
				};

			setTimeout( $.proxy( function() {

				if( typeof this.$largeImg !== 'undefined' ) {
					this.$largeImg.fadeOut( 'fast' );
				}
				this.$previewEl.css( 'height', 0 );
				// the current expanded item (might be different from this.$item)
				var $expandedItem = $items.eq( this.expandedIdx );
				$expandedItem.css( 'height', $expandedItem.data( 'height' ) ).on( transEndEventName, onEndFn );

				if( !support ) {
					onEndFn.call();
				}

			}, this ), 25 );
			
			return false;

		},
		calcHeight : function() {

			var heightPreview = winsize.height - this.$item.data( 'height' ) - marginExpanded,
				itemHeight = winsize.height;

			if( heightPreview < settings.minHeight ) {
				heightPreview = settings.minHeight;
				itemHeight = settings.minHeight + this.$item.data( 'height' ) + marginExpanded;
			}

			this.height = heightPreview;
			this.itemHeight = itemHeight;

		},
		setHeights : function() {

			var self = this,
				onEndFn = function() {
					if( support ) {
						self.$item.off( transEndEventName );
					}
					self.$item.addClass( 'humbler-expanded' );
				};

			this.calcHeight();
			this.$previewEl.css( 'height', this.height );
			this.$item.css( 'height', this.itemHeight ).on( transEndEventName, onEndFn );

			if( !support ) {
				onEndFn.call();
			}

		},
		positionPreview : function() {

			// scroll page
			// case 1 : preview height + item height fits in window´s height
			// case 2 : preview height + item height does not fit in window´s height and preview height is smaller than window´s height
			// case 3 : preview height + item height does not fit in window´s height and preview height is bigger than window´s height
			var position = this.$item.data( 'offsetTop' ),
				previewOffsetT = this.$previewEl.offset().top - scrollExtra,
				scrollVal = this.height + this.$item.data( 'height' ) + marginExpanded <= winsize.height ? position : this.height < winsize.height ? previewOffsetT - ( winsize.height - this.height ) : previewOffsetT;
			
			$body.animate( { scrollTop : scrollVal }, settings.speed );

		},
		setTransition  : function() {
			this.$previewEl.css( 'transition', 'height ' + settings.speed + 'ms ' + settings.easing );
			this.$item.css( 'transition', 'height ' + settings.speed + 'ms ' + settings.easing );
		},
		getEl : function() {
			return this.$previewEl;
		}
	}

	return { init : init };

})();

$(window).load(function(){ 
	humbler.init();
	HumblerGrid.init();
});

$(window).resize(function(){
	humbler.theresize();
})