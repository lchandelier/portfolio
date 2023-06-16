---
layout: post
title:  "Accessibility is like baking - you have to know how to measure up!"
ref: accessibilite-patisserie
date:   2022-12-22 18:48:00 +0100
category: "blog"
permalink: /en/blog/accessibility-like-baking-know-how-to-measure.html
lang: en
thumbnail: /assets/img/blog/access-medium.jpg
alt_thumb: 
---

<img src="{{ site.baseurl }}/assets/img/blog/access.jpg" alt="" 
             srcset="{{ site.baseurl }}/assets/img/blog/access-medium.jpg 670w,
          {{ site.baseurl }}/assets/img/blog/access.jpg 1024w"
          sizes="(min-width:671px) 1024px"/>

**When I started in digital accessibility, I wanted to make sure that the content presented was readable by everyone.
Like anyone learning a new field, I was clumsy in my approach. Instead of simply rendering information, I made it too wordy, too complex, by doubling it up or using unnecessary attributes. Hence my baking analogy, because, as you know, too much or too little of an ingredient and your cake becomes inedible.**


## Redundant data

### With links

I'll start with a mistake I made when working on my first accessibility project: doubling the information of a link with the title attribute. A winning double combo: I also specified in the title that it was a link, so you never know.

Imagine yourself in a website with a mega menu of six categories with ten to twenty links under each of them. This is useful on any site with a lot of content to offer and is not a problem in itself. But in my case, all the links were built like this:

{% highlight html %}
{% raw %}
<a href="mylink.html" title="Link to top 10 things to do in accessibility">Top 10 things to do in accessibility</a>
{% endraw %}
{% endhighlight %}

The rendering (on NVDA) gives the following result: "Top 10 things to do in accessibility link, link to top 10 things to do in accessibility".

And that's the problem: it's useless and a real pain for screen-reader users. Like putting too much butter or too much cream in your recipe, it's cumbersome.

Let's simplify it like this:

{% highlight html %}
{% raw %}
<a href="mylink.html">Top 10 things to do in accessibility</a>
{% endraw %}
{% endhighlight %}

NVDA will read "Top 10 things to do in accessibility link". Put in the context of our mega menu, it's a little easier to digest.

### With images

It's the same thing for images: when you fill in the alt attribute (only for images that carry information, be careful), there's no need to specify that it's an image again - the screen reader knows this and indicates it.<br/>
Here's an example not to be reproduced at home:

{% highlight html %}
{% raw %}
<img src="tournoi.jpg" alt="image of the 2nd edition of the wizards' tournament from october 3 to 7, 2023" />
{% endraw %}
{% endhighlight %}

Here is a good example :

{% highlight html %}
{% raw %}
<img src="tournoi.jpg" alt="2nd edition of the wizards' tournament from october 3 to 7, 2023" />
{% endraw %}
{% endhighlight %}

### Exceptions

There are a few contexts in which we can specify the nature of an image, for example in the artistic world: "Black and white photograph of the Eiffel Tower", "Portrait of Frida Kahlo wearing a brown dress with a flower crown on her head". Here, precision enriches the meaning of the image, a bit like adding a pinch of salt to your food to enhance its taste.


## Aria

What is this? These are HTML attributes and roles that add meaning and semantics to the various components we code. For example, ARIA will let you know if a menu is open or closed, if a tab is selected, etc. Here's [an excellent definition from Mozilla](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA "(new window)"){:target="_blank"}{:rel="noopener noreferrer"}.

Friendly reminder of ARIA's first rule  : [do not use it](https://www.w3.org/TR/using-aria/#firstrule "(new window)"){:target="_blank"}{:rel="noopener noreferrer"}.
<br/>It's very easy to mess up with ARIA. Even if we are sure to do the right thing, "less is more".

## Using the wrong roles

One mistake I see quite regularly is the use of the `menu` and `menuitem` roles.
It's true that names like that makes you want to use it, to apply it to a main menu for example. Well... Don't!<br/>
These roles are reserved **exclusively** for application menus. If you're recoding Microsoft Word, that's fine, but for any website, just use `<nav><ul><li></li></ul></nav>`, that will be enough.<br/>
It's a bit like sugar, you can remove some of it, it will still be edible for everyone and it will be better for someone who has to take care of too much sugar.

An example of how these roles can be used is available on [the ARIA Authoring Practices Guide website](https://www.w3.org/WAI/ARIA/apg/example-index/menubar/menubar-editor.html "(new window)"){:target="_blank"}{:rel="noopener noreferrer"}.

### Redundancies or unnecessary information overload

The button tag is natively a button. There's no need to specify it again. The same goes for links, lists, titles and many others.

Here's an example of code to avoid:

{% highlight html %}
{% raw %}
<button type="button" role="button">My button</button>
<a href="mylink.html" role="link">My link</a>
<ul role="list"><li role="listitem">My item list</li></ul>
{% endraw %}
{% endhighlight %}

Prefer the following code:

{% highlight html %}
{% raw %}
<button type="button">My button</button>
<a href="mylink.html">My link</a>
<ul><li>My item list</li></ul>
{% endraw %}
{% endhighlight %}

### Exceptions

Because the world of accessibility and assistive technologies is full of surprises, in some versions of VoiceOver (the default screen reader on macOS and iOS) with the Safari browser, images in SVG format are not detected but considered as a group (and rendered with the role group instead of image).
<br/>In older versions, the alt attribute is not rendered at all. To compensate for this behavior, add the following redundancy:

{% highlight html %}
{% raw %}
<img src="logo.svg" alt="24 jours de web" role="img" />
{% endraw %}
{% endhighlight %}

**This technique should only be applied to SVG images requiring an alt attribute.**

Another exception concerns lists. <br/>
For design purposes, you may want to use a list without displaying the bullets. In this case, you will use `list-style:none;`. By doing so, the list loses its semantic value and is not correctly rendered in some versions of VoiceOver, still with Safari. <br/>There are two solutions: set a `list` on the `<ul>`tag  or set transparent bullets with a PNG via CSS. Personally, I apply the second method, as I prefer to manage this in CSS rather than work around the problem with ARIA. It's a matter of taste, and you're free to apply whichever technique you prefer.

## tabindex

I also made this mistake at the beginning: setting positive values to the tabindex attribute to ensure that the navigation order would be consistent.

**Never add a positive value to a tabindex.** 
<br/>It would be a bit like putting eggs first, then flour, then butter, then yeast, instead of putting egg, butter, mix, then flour, yeast, it would give nothing tasty.<br/>
If your code is logically structured, there's no need. The only two values to use on the `tabindex` are `0` and `-1`.
<br/>`tabindex="0"` allows you to make an element that isn't natively focusable, focusable (a `<div>`, for example). The focus will be integrated into the logical navigation order (top to bottom and left to right in our part of the world).<br/>
`tabindex="-1"` is used to programmatically give focus to an element. For example:

{% highlight html %}
{% raw %}
<div id="message" tabindex="-1">
    <p>My message</p>
</div>
<button type="submit" id="submitBtn">Send my comment</button>
{% endraw %}
{% endhighlight %}

In JavaScript, we can position the focus on this div like so :

{% highlight javascript %}
{% raw %}
<script>
    document.getElementById('submitBtn').addEventListener('click', () => {
        document.getElementById('message').focus();
    })
</script>
{% endraw %}
{% endhighlight %}

## Content imbalance by audience

Clearly, the imbalance is, for the most part, to the detriment of people with disabilities.
And yet, another trap I still sometimes fall into is giving more information to people using a screen reader than to people who don't.<br/>
Information, or the lack of it, **must be equal for everyone**. If information is present, it must be visible to everyone.

Let's take an image showing a premium rate number :

<img src="{{ site.baseurl }}/assets/img/blog/numero-surtaxe.jpg" alt="0811 123 456 (service 0.05€ / min + price of call)"/>

{% highlight html %}
{% raw %}
<img src="numero-surtaxe.jpg" alt="0811 123 456 (service 0.05€ / min + price of call)">
{% endraw %}
{% endhighlight %}

Here, someone using a screen reader will know that the number is taxed as well as its cost.
In the [RGAA (in french)](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/ "(new window)"){:hreflang="fr"}{:target="_blank"}{:rel="noopener noreferrer"} and the [WCAG](https://www.w3.org/WAI/WCAG21/quickref/ "(new window)"){:target="_blank"}{:rel="noopener noreferrer"}, this is a non-conformity.
A good implementation would be to display the image with all the pricing information:

<img src="{{ site.baseurl }}/assets/img/blog/numero-surtaxe-ok.jpg" alt="0811 123 456 (service 0.05€ / min + price of call)"/>

{% highlight html %}
{% raw %}
<img src="numero-surtaxe.jpg-ok" alt="0811 123 456 (service 0.05€ / min + price of call)">
{% endraw %}
{% endhighlight %}

The image contains information about the cost of the call. Everyone has access to it.

### Exception

You know what I mean - another exception! If you're designing a complex JavaScript component that's not too common, let's say a drag-and-drop system, it may be useful to tell someone using a screen reader how to interact with it. In this case, a description accessible only via a screen reader is quite appropriate.<br/>
For example: "Use the space bar to select an item, then the up/down arrows to move it. Finally, press space to drop the item."

## Conclusion

As you can see, it's all about going straight to the point! Most of the time, it's a question of balance. There are exceptions, of course, due to screen reader bugs, but these are marginal cases.

Even today, I tend to add more detail for a screen reader. <br/>But now that I'm aware of it, I'm more attentive and take a step back before doing it.

**The important thing is not to interfere with the rendering with unnecessary or redundant information.**
<br/>
Apart from basic accessible design, which allows people with disabilities to have the same access to content as anyone else, the addition of guidance must be done in specific cases: to help navigate a complex interface component, or to overcome problems with assistive technology support.

Since you're still here, I'll give you a recipe I'm particularly fond of, which works with quite a few fruits depending on the season:

For 6 people :

- 160 grams flour
- 150 grams sugar (you can use less)
- 130 grams butter
- 1 teaspoon of baking powder
- 3 eggs
- 3 pears


Preheat the oven to 180°, then cut the pears into small pieces. Mix the sugar and eggs, then add the flour and baking powder. Melt the butter and mix into the mixture. Finally, add the pear pieces and mix well.
Add a pinch of salt and a dash of rum for an interesting flavour.

Pour into a cake tin and bake for 40 minutes at 180°.

**Accessibility is good - eat it!**

Thanks to the proof-reading team and to Romain Gervois for his ever-rich feedback!

You can find this article and many other very interesting articles on [24 jours de web (in french only)](https://www.24joursdeweb.fr/2022/ "24 jours de web 2022 edition (new window)"){:target="_blank"}{:hreflang="fr"}{:rel="noopener noreferrer"}