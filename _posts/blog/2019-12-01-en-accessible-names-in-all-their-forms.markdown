---
layout: post
title:  "Accessible names in all their states"
ref: accessible-names
date:   2019-12-01 18:56:09 +0100
category: "blog"
permalink: /en/blog/accessible-names-in-all-their-states.html
lang: en
thumbnail: /assets/img/blog/code-medium.webp
alt_thumb: 
---

<img src="{{ site.baseurl }}/assets/img/blog/code.webp" alt="" 
             srcset="{{ site.baseurl }}/assets/img/blog/code-medium.webp 670w,
          {{ site.baseurl }}/assets/img/blog/code.webp 1024w"
          sizes="(min-width:671px) 1024px"/> 


When developing an interface in an accessible way, we must think about filling in **relevant** accessible names.

In addition to images with the `alt` attribute and form fields with `label` tags, elements that need it are links/buttons with icons (magnifying glass to launch a search, social network icons), buttons with short names like Send, Continue, etc.

There are several ways to add meaning to these elements.

In this article, I will list some of them, give their advantages, disadvantages and compatibility with screen readers.

## What is an accessible name?

An accessible name is a text rendered by an assistive technology, for example, a screen reader.
It can be the `label` of a field, the `alt` attribute of an image, the text of a button and many others.
Let's start with the first method.

## Invisible text

Invisible text is often integrated with the `sr-only` or `visually-hidden` CSS class.
The particularity of this CSS class is that the text is invisible on screen, but remains readable by screen readers.
Here, we do not use `display: none;`; or `visibility: hidden;` because this would make the text impossible to read by a screen reader.


I invite you to read [Gaël Poupard’s article (in French)](https://www.ffoodd.fr/cache-cache-css/ "Gaël Poupard’s website (new window)"){:target="_blank"}{:rel="noopener noreferrer"} to see the anatomy of this class in detail.


Advantages of invisible text:

* Particularly robust, it has excellent (backward) compatibility with assistive technologies
* If CSS is disabled, invisible text is displayed
* A user using custom styles can choose to display the hidden text
* It can be translated via online translation tools (such as Google Translate)

Disadvantage: This method requires more code than adding an ARIA or a `title` attribute, which is not always easy depending on the development.

Example of use:

{% highlight html %}
{% raw %}
<a href="https://twitter.com/24joursdeweb" class="twitter">
    <span class="sr-only">24 jours de web sur Twitter</span>
</a>
{% endraw %}
{% endhighlight %}

<img src="{{ site.baseurl }}/assets/img/blog/icon-css.webp" alt="CSS is activated, only the Facebook icon is visible"/>

CSS is activated, only the Facebook icon is visible

<img src="{{ site.baseurl }}/assets/img/blog/icon-text.webp" alt="CSS is disabled, the text of the icon appears: Terra potager sur Facebook"/>

CSS is disabled, the text of the icon appears: Terra potager sur Facebook

I recommend this technique because it offers the best compatibility.

Make sure you only apply this class to hidden text. Indeed, if it is added on an element positioned in absolute, [there may be surprises (in French)](https://www.ffoodd.fr/cache-cache-css/#8919 "Gaël Poupard’s website (new window)"){:target="_blank"}{:rel="noopener noreferrer"}.

## Aria-label

Another technique is to use the `aria-label` attribute.  
The advantages of this technique are:

* It is easier to add than a hidden text via `sr-only` or `visually-hidden`.
* It has a very good support from screen readers

But has the following disadvantages:

* Breaks the [first ARIA rule](https://www.w3.org/TR/using-aria/#rule1 "W3C (new window)"){:target="_blank"}{:rel="noopener noreferrer"}
* Has a little impact on SEO
* `aria-label` is part of [the translatable elements](https://w3c.github.io/aria/#translatable-states-and-properties "W3C (new window)"){:target="_blank"}{:rel="noopener noreferrer"} by tools like Google Translate, but [it is still poorly supported](https://adrianroselli.com/2019/11/aria-label-does-not-translate.html "Adrian Roselli's article (new window)"){:target="_blank"}{:rel="noopener noreferrer"}.

Example of use:

{% highlight html %}
{% raw %}
<button aria-label="Add to cart Final Fantasy 7 Remake">
    Add to cart
</button>
{% endraw %}
{% endhighlight %}    

**Important note**: a new WCAG criterion, [2.5.3 - Label in name](https://www.w3.org/TR/WCAG21/#label-in-name "W3C (new window)"){:target="_blank"}{:rel="noopener noreferrer"}, specifies that if an interface element (link, button, etc.) contains text or a text image, the accessible name must contain that text. Thus, the `aria-label` above must contain the words Add to cart.

This criterion allows users of speech recognition software to indicate on which button to click.

In the example above, we can imagine that there are several Add to Cart buttons and their `aria-label` allows to distinguish which one we want to click on.

## Aria-labelledby / aria-describedby

The [ARIA specification](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby "W3C (new window)"){:target="_blank"}{:rel="noopener noreferrer"} states that if the label text is visible on screen, authors SHOULD use `aria-labelledby` and SHOULD NOT use `aria-label`.

This alternative should therefore be used to link an element to **on-screen text**.


For example, on a modal window:

{% highlight html %}
{% raw %}
<dialog role="dialog" aria-labelledby="modalTitle">
    <h1 id="modalTitle">Modal title</h1>
    ...
</dialog>
{% endraw %}
{% endhighlight %}      

or on a graphic element, here a red dot indicating a delay in payment:

![User dashboard. The active tab is My Account. A red dot next to the label indicates that there is an overdue payment.](https://media.24joursdeweb.fr/2019/11/aria-labelledby.webp)

{% highlight html %}
{% raw %}
<button id="myAccount" aria-describedby="accountLabel dotTitle">
    <span id="accountLabel">My account</span>
</button>
    
<h2 id="dotTitle" class="error">Overdue payment</h2>
{% endraw %}
{% endhighlight %}   

You can link several texts to an element. `aria-labelledby` (like `aria-describedby`), takes a list of identifiers as values.

The above example will be returned **in order of calling identifiers**; here, My account overdue payment.

Note that `aria-labelledby` can be accompanied by `aria-describedby` to give a more extensive explanation than a title.

We can also find it on SVG icons:

{% highlight html %}
{% raw %}
<svg role="img" aria-labelledby="fb" version="1.1" 
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve">
    <title id="fb">Facebook</title>
        ...
</svg>
{% endraw %}
{% endhighlight %}

Its advantages are:

* Simplicity to add (more than `.sr-only` text)
* This technique is well supported by assistive technologies
* Text references (identifiers) can be placed anywhere in the page
* Since identifiers point to visible text, translation is possible via online translation tools.

If we can speak about disadvantage, it is the attribute which has the highest priority in the calculation of the accessible name. It is necessary to test its restitution to avoid errors.

## Title

The main advantage of the `title` attribute is that it displays additional information on mouseover. Thus, someone navigating with the mouse can have this information if they need it.  
It can also be translated via online translation tools.

{% highlight html %}
{% raw %}
<button id="showPassword">
    <span title="Show password">
        <svg role="img" aria-label="Show password">
            <use xlink:href="#show-password"></use>
        </svg>
    </span>
</button>
{% endraw %}
{% endhighlight %}

The `title` is placed on a child container without semantics to avoid double restitution.

On the other hand, this technique has many disadvantages:

* The information is invisible when browsing with the keyboard or on a cell phone
* It is not or only slightly visible to screen magnifiers users
* Compatibility with assistive technologies is limited
* It [does not impact SEO (in French)](https://blog.axe-net.fr/attribut-title-lien-referencement/ "axe-net (new window)"){:target="_blank"}{:rel="noopener noreferrer"}

It's better to use `title` sparingly and with a more accessible alternative such as `aria-label` or hidden text.

## Order of restitution by screen readers

I have mentioned several times a notion of priority or accessible name calculation.

Indeed, browsers make a calculation to know what is the accessible name of an element. So you have to be careful about using the different techniques I just listed.

To summarize the [calculation method](https://www.w3.org/TR/2018/REC-accname-1.1-20181218/#mapping_additional_nd_te "W3C (new window)"){:target="_blank"}{:rel="noopener noreferrer"}, `aria-labelledby` has priority over `aria-label`, which itself has priority over text inserted in an element.

For example :

{% highlight html %}
{% raw %}
<button class="error-dot" aria-labelledby="dotTitle" aria-label="Warning"> my button </button>

<h2 id="dotTitle" class="error">Overdue payment</h2>
{% endraw %}
{% endhighlight %}

Here, `aria-labelledby` is present, the result returned will be overdue payment.

In the following example, the text Continue will be completely ignored, in favor of Continue to payment step

{% highlight html %}
{% raw %}
<button aria-label="Continue to payment step">
    Continue
</button>
{% endraw %}
{% endhighlight %}

## Conclusion

The first rule of ARIA is to not use ARIA and to favor native elements.

Indeed, HTML is a rich language and ARIA should only be used as a last resort.  
Its support is not the same depending on [the element on which it is used](https://developer.paciellogroup.com/blog/2017/07/short-note-on-aria-label-aria-labelledby-and-aria-describedby/ "Paciello Group (new window)"){:target="_blank"}{:rel="noopener noreferrer"}.

Therefore, if you really need to use one of these techniques, I recommend the hidden text technique for the majority of cases and to **respect the semantics**; for example, to use real `label` for form fields and to use the `alt` attribute of the `img` tag.

Even better, during the UX and/or design phase, check if it is possible to integrate the texts directly in a visible way. This will always be the best solution.

## To go further:

[Compatibility of screen readers with ARIA attributes](https://www.powermapper.com/tests/screen-readers/wcag/ "Powermapper (new window)"){:target="_blank"}{:rel="noopener noreferrer"}

Thanks to Romain Gervois for his kind review and good advices as well as to Nicolas Hoffmann and the proofreaders :)

You can find this article and many other very interesting articles on [24 jours de web (in french only)](https://www.24joursdeweb.fr/2019/ "24 jours de web 2019 edition (new window)"){:target="_blank"}{:hreflang="fr"}{:rel="noopener noreferrer"}