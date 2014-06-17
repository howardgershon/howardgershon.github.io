---
layout: post
title:  "Aaay-pee-eye"
date:   2014-06-10 20:45:53
categories: jekyll update
---

You'll find this post in your `_posts` directory - edit this post and re-build (or run with the `-w` switch) to see your changes!
To add new posts, simply add a file in the `_posts` directory that follows the convention: YYYY-MM-DD-name-of-post.ext.

Jekyll also offers powerful support for code snippets:

{% highlight javascript linenos %}

var makeMark = function(resp, lat, lon, rad){
            //set color of circle
            var colr = (resp == 'yes') ? '#0F0' : '#F00';
            var rsvpOpt = {
                strokeColor: colr,
                strokeOpacity: 1,
                strokeWeight: 1,
                fillColor: colr,
                fillOpacity: .5,
                map : map,
                center: new google.maps.LatLng(lat, lon),
                radius: rad
            }    

            rsvpCirc = new google.maps.Circle(rsvpOpt);
            //setTimeout(rsvpCirc.setMap(null), 1000);
                
        };
        
        var ws = new WebSocket('ws://stream.meetup.com/2/rsvps');
        //ws.onmessage() = function(msg){makeMark(msg.data);};
        ws.onmessage = function(msg){
            //var results = document.getElementById('results');
            var rsvp = JSON.parse(msg.data);
            var name = rsvp.member['member_name'];
            var group = rsvp.group['group_name'];
            var city = rsvp.group['group_city'];
            var state = rsvp.group['group_state'];
            var lat = rsvp.group['group_lat'];
            var lon = rsvp.group['group_lon'];
            var resp = rsvp['response'];
            var rad = 20000;
            var rp = (resp == 'yes') ? 'will' : "won't";
            //results.appendChild(document.createTextNode(" * " + name + " " + rp + " meetup with " + group + " in " + city + ', ' + state));
            //results.appendChild(document.createElement('br'));
            makeMark(resp, lat, lon, rad);
        }; 

{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll's GitHub repo][jekyll-gh].

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
