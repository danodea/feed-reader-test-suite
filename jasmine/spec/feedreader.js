/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    
    describe('RSS Feeds', function() {
        
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* The test could work like this, but then if it fails
         * you can't tell which feed is missing a URL:
         *
         * it('should have a defined URL', function() {
         *     for (var i = 0; i < allFeeds.length; i++) {
         *         expect(allFeeds[i].url).toBeDefined();
         *     }
         * });
         *
         * Instead, define the test inside a function so that you can
         * pass the results of a For loop into the test.
         * This way, you can test each element separately and, if there
         * is a failure, the test will tell you which element of the
         * array failed!
         */

        function testThatUrlIsDefined(feed, i) {
            it('should have a defined url (' + i + ')', function () {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        };
        
        for (var i = 0; i < allFeeds.length; i++) {
            testThatUrlIsDefined(allFeeds[i], i)
        };

        function testThatNameIsDefined(feed, i) {
            it('should have a defined name (' + i + ')', function () {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        };
        
        for (var i = 0; i < allFeeds.length; i++) {
            testThatNameIsDefined(allFeeds[i], i)
        };
    });


    describe('The menu', function() {

        it('should be hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('should hide and show when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });


    describe('Initial Entries', function() {

        beforeEach(function(done) {
           loadFeed(0, done);
        });

        it('has at least one entry in the feed list', function(done) {
           expect($('.feed .entry').length).not.toBe(0);
           done();
        });

    });


    describe('New Feed Selection', function() {

        var firstContent;

        beforeEach(function(done) {
            firstContent = $('.feed').html();
            loadFeed(1, done);
        });

        it('should change the content when a new feed is selected', function(done) {
            expect(firstContent).not.toBe($('.feed').html());
            done();
        });
    })
}());
