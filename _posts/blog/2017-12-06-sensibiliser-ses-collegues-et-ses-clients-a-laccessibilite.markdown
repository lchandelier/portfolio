---
layout: post
title:  "Sensibiliser ses collegues et ses clients à l’accessibilité"
ref: a11y-awareness
date:   2017-12-06 13:22:16 +0100
category: "blog"
permalink: /blog/sensibiliser-ses-collegues-et-ses-clients-a-laccessibilite.html
lang: fr
thumbnail: /assets/img/blog/access-medium.jpg
alt_thumb: 
---

<img src="{{ site.baseurl }}/assets/img/blog/access.jpg" alt="" 
             srcset="{{ site.baseurl }}/assets/img/blog/access-medium.jpg 670w,
          {{ site.baseurl }}/assets/img/blog/access.jpg 1024w"
          sizes="(min-width:671px) 1024px"/> 

Avant d’entrer dans le sujet, voici 2 définitions complémentaires de l’accessibilité :

De la <span lang="en">Web Accessibility Initiative</span> :

<blockquote>L’accessibilité du Web signifie que les personnes en situation de handicap peuvent utiliser le Web. Plus précisément qu’elles peuvent percevoir, comprendre, naviguer et interagir avec le Web, et qu’elles peuvent contribuer sur le Web. L’accessibilité du Web bénéficie aussi à d’autres, notamment les personnes âgées dont les capacités changent avec l’âge. L’accessibilité du Web comprend tous les handicaps qui affectent l’accès au Web, ce qui inclut les handicaps visuels, auditifs, physiques, de parole, cognitifs et neurologiques.</blockquote>

Et de Tim Berners-Lee :

<blockquote>Mettre le Web et ses services à la disposition de tous les individus, quels que soient leur matériel ou logiciel, leur infrastructure réseau, leur langue maternelle, leur culture, leur localisation géographique, ou leurs aptitudes physiques ou mentales. L’accès à l’information et à la communication est un droit universel. Le web est devenu un média majeur et il se doit d’être accessible à tous sans discrimination. Concevoir dans le cadre du <q>design for all</q> (<q>conception pour tous</q>), c’est anticiper sur les usages, répondre à une logique de développement durable et surtout, utiliser la technologie dans le respect des individualités.</blockquote>

## Introduction

L’accessibilité reste un sujet nébuleux voire inconnu pour nos collègues et nos clients. Certains en ont entendu parler mais ne savent pas vraiment de quoi il retourne. D’autres ne s’imaginent même pas comment une personne aveugle peut aller sur Internet ou encore, que l’accessibilité, indispensable pour les personnes en situation de handicap, est en réalité utile pour tout le monde.

Il y a beaucoup de travail à faire pour sensibiliser, éduquer et surtout, intéresser les gens à l’accessibilité.

Pour la majorité (clients ou professionnels du web) c’est contraignant, complexe, ça coûte cher et c’est pour une minorité.

Les arguments du type <q>vous allez payer une amende si votre site n’est pas conforme</q> ou <q>c’est la bonne chose à faire</q>, bien que vrais, ne fonctionnent absolument pas.
En partant de ce constat, comment, en tant que développeuse front, j’ai réussi, petit à petit, à intéresser mes collègues à ce sujet ?

## Les collègues

Quand je suis arrivée dans mon ancienne société, il n’y avait pas de projets d’accessibilité dans les tuyaux. J’appliquais donc mes connaissances comme je pouvais sur les projets existants. Rien de transcendant mais toujours mieux que rien. Je faisais de la veille presque quotidiennement sur le sujet et la partageais sur notre Slack interne. Cette veille ne concernait pas que le front-end. Je lisais des articles sur des techniques de design accessible, de l’UX, etc. Ainsi, tous mes collègues pouvaient être concernés, prenait qui voulait.

À force d’en parler et de partager ma veille sur le sujet, le message a commencé à passer. Dans les derniers projets auxquels j’ai participé, j’ai constaté que les formulaires avaient retrouvé leurs labels, que les messages d’erreurs étaient mieux signalés… Il arrivait parfois que des collègues designers me posent des questions sur une manière de concevoir un composant pour qu’il soit accessible, même si l’accessibilité n’était pas vendue dans le projet.

Pour avoir un retour plus concret, j’ai demandé aux personnes avec lesquelles j’ai le plus travaillé de me dire comment leurs regard/connaissances avaient évolué à force de voir passer des ressources sur l’accessibilité.

Globalement, j’ai réussi à les convaincre de l’importance du sujet, ce qui est un bon début. Un des développeurs m’a indiqué qu’il appliquait quelques bonnes pratiques systématiquement, même sur ses projets personnels. D’autres m’ont dit que ça leur avait apporté une autre vision, plus technique, sur le sujet ou encore qu’ils pensent maintenant plus loin que <q>ce n’est que pour les aveugles</q>.

## Le client

D’un point de vue client, il y a eu un projet pour lequel l’accessibilité était perçue comme une contrainte. Il s’agissait d’un organisme public, et donc avec l’obligation d’être accessible (loi no 2005-102 du 11 février 2005 pour l’égalité des droits et des chances, la participation et la citoyenneté des personnes handicapées). À force d’aborder la refonte de manière pédagogique ([merci Atalan pour les notices AcceDe Web](https://www.accede-web.com/notices/ "Notices de conception AcceDe Web (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}), de montrer que certaines choses n’étaient pas si complexes à réaliser, l’intérêt et la curiosité du client grandissaient. Il ne subissait plus, il devenait proactif. Il posait des questions pour savoir comment faire mieux, si tel composant ne risquait pas de poser problème… Un collègue travaillant avec moi sur le projet m’a dit qu’on voyait que ce client avait une vraie volonté de bien faire, que ce n’était plus l’obligation d’être en conformité qui le motivait.

## Conclusion

C’est un retour d’expérience sur un peu plus de deux ans et je pense sincèrement qu’à moins de tomber sur des gens avec des œillères, il est bien plus simple qu’il n’y paraît de sensibiliser vos collègues et clients sur l’accessibilité. Les gens ne sont pas fermés sur le sujet, il faut qu’il y ait une prise de conscience de leur part. Bien sûr, avoir un membre de l’équipe qui est intéressé par le sujet et qui va le partager va aider à cette prise de conscience. Le fait que des personnes en situation de handicap utilisent Internet ne coule malheureusement pas de source, combien de fois ai-je entendu dire <q>mais comment fait un aveugle ?</q>

Cela ne coule pas de source que l’accessibilité, ce n’est pas uniquement pour ces mêmes personnes.

Vous aurez constaté que je ne mentionnais que les personnes aveugles dans cet article. C’est simplement parce qu’il s’agit du seul type de handicap auquel les gens pensent quand je leur parle d’accessibilité. Ils ne s’imaginent pas tous les outils qui existent pour que des personnes avec des handicaps variés (surdité, dyslexie, troubles de l’attention, handicap moteur, etc.) puissent accéder à Internet.

Ils ne pensent pas non plus à quel point la prise en compte de l’accessibilité facilite la vie de tout un chacun.

Pourtant, si on pense aux seniors, ils sont 63% à utiliser Internet et 55% d’entre eux font des achats en ligne. On peut aussi penser à quelqu’un qui se casserait le bras et ne pourrait pas utiliser sa souris pendant un certain temps ou encore à une personne qui n’a pas spécialement de problème de vue mais qui, par confort, préfère zoomer les pages de son navigateur. Tout ça pour bien illustrer que l’accessibilité est primordiale pour les personnes en situation de handicap mais bénéficie aussi à tout le monde. Ce n’est pas pour une <q>minorité</q>.

Aujourd’hui cela me paraît évident mais il a fallu que je sois amenée à travailler sur un projet d’accessibilité pour savoir que ça existait et tout ce que ça impliquait. Je n’ai jamais entendu parler de ce sujet pendant ma formation et beaucoup des professionnels du web que j’ai rencontrés jusqu’à présent ont des notions (<q>ah oui c’est pour les aveugles</q>) mais pas assez poussées pour aller sensibiliser un client par la suite.

Pour que ce soit évident pour tout le monde, il faut expliquer comment c’est possible, parler des technologies d’assistances, montrer l’impact considérable que cela peut avoir.

Tout est dans la manière d’aborder les choses. Je pense que ça ne sert à rien de tendre le bâton des sanctions et de l’obligation légale pour faire passer le message : en montrant à tous les acteurs d’un projet qu’intégrer l’accessibilité dans leur process peut les faire grandir, leur apprendre des choses et bien évidemment donne la possibilité à plus de personnes d’accéder au fruit de leur travail, le message passe bien mieux.

## Quelques ressources pour aller plus loin

* [Les notices AcceDe web](https://www.accede-web.com/notices/ "Notices de conception AcceDe Web (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"},
* [L’extension aXe](https://www.deque.com/axe/axe-for-web/ "aXe sur le site de Deque (nouvelle fenêtre en anglais)"){:target="_blank"}{:hreflang="en"}{:rel="noopener noreferrer"} pour faire des audits rapides et automatisés avec Firefox ou Chrome,
* [Liste de diverses ressources sur l’accessibilité](https://github.com/atalan/a11y-resources/blob/master/list-of-a11y-resources.md "Liste de ressources sur le Github d’atalan (nouvelle fenêtre)"){:target="_blank"}{:hreflang="en"}{:rel="noopener noreferrer"}. 

Vous pouvez retrouver cet article et plein d'autres articles très intéressants sur [24 jours de web](https://www.24joursdeweb.fr/2017/ "24 jours de web édition 2017 (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}