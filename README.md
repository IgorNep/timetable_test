

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">Best-README-Template</h3>

  <p align="center">
    An awesome Timetable Application
    <br />
    <a href="https://github.com/IgorNep/timetable_test"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://igornep.github.io/timetable_test/">View Demo</a> 
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Simple meeting planning calendar for a meeting room in your office.

### Built With

This suoer simple app has been built with tools such as:
* [JavaScript](https://developer.mozilla.org/uk/docs/Web/JavaScript)
* [Materialize-css](https://materializecss.com/)
* [SCSS](https://sass-lang.com/)
* [Webpack](https://webpack.js.org/)
* [SCSS](https://sass-lang.com/)
* [Axios](https://www.npmjs.com/package/axios)

<!-- GETTING STARTED -->
## Getting Started

 To start use this app on your local machine just follow next steps:
 
 1.Clone this repository in folder you want
 2.Open folder in any code editor (VS code for example)

### Installation
 1.Run command in terminal :
 ```sh
 npm install
 ``` 
  (all files will be installed by using package.json file)
 2.after that make sure you are in yours project folder and then run next command in terminal:
 ```sh
  npm run start
  ```
  (project will be automatically run and open browser chrome ,
  so it is good if you have it :) )

<!-- USAGE EXAMPLES -->
## Usage
```text
1.To add new meeting click on button "New Event +" and the modal winow will appear
2.In modal window input required values such as :
  -name of the event
  -participants (you can choose like single like multiple)
  -choose the day of the event
  -choose the time of the event
(If the table already has event for chosen date and time the error will show up - you should choose other date or/and time)
3.After successfull creating you will redirect to table screen and new event will appear in table.
  -All new events will persist in localstorage for possibility of using events data after page reload.
4.You can manipulate with event instances:
  -you can move it by drag and drop.
  -you can put new event only on empty time slot otherwise alert message will appear.
  -you can delete event by click on delete icon. After click the confirmation modal window will appear. Just make choice yes or no.
 5.You have ability to sort events by participants. Just use selector in right top corner.
 ```

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Igor Nepomyashchyy -  igornep@gmail.com

Project Link: [https://github.com/IgorNep/timetable_test](https://github.com/IgorNep/timetable_test)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Animate.css](https://daneden.github.io/animate.css)
* [Loaders.css](https://connoratherton.com/loaders)
* [Slick Carousel](https://kenwheeler.github.io/slick)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
* [Sticky Kit](http://leafo.net/sticky-kit)
* [JVectorMap](http://jvectormap.com)
* [Font Awesome](https://fontawesome.com)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
