<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Magari Poa Marketplace</title>
    <link rel="stylesheet" href="styles.css">

    <!-- Box Icons Links -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>


</head>

<body>

    <!--navbar section-->
    <header>
        <!--Container-->
       <div class="nav">
        <!--Menu icon add-->
        <i class='bx bx-menu' id="menu-icon"></i>

        <!--Logo area-->
        <a href="#" class="logo">Magari<span>Poa</span></a>

        <!--list-->
        <ul class="navbar">
            <li><a href="#home" class="active">Home</a></li>
            <li><a href="#cars">Cars</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#blog">Our Blog</a></li>
        </ul>

        <!--Search-->
        <i class='bx bx-search' id="search-icon"></i>

        <div class="search-box container">
            <input type="search" name="" id="" placeholder="search vehicle">
        </div>
        <!--div class="search-filters">
                <input type="text" id="search" placeholder="Search by name or location...">
                <input type="number" id="price" placeholder="Max Price">
            </div>
        
            <div id="car-container"></div -->
       </div>
    </header>

    <!--Home section-->
    <section class="home" id="home">
        <div class="home-text">
            <h1> We Have Everything <br> Your <span>Car</span> Need</h1>
            <p>Lorem ipsum dolor sit amet, consectetur <br>adipiscing elit, sed do eiusmod tempor<br>incididunt ut labore et dolore magna<br> aliqua. Ut enim ad minim veniam, <br>quis nostrud exercitation ullamco laboris<br>nisi ut aliquip ex ea commodo consequat.<br> Duis aute irure dolor in reprehenderit in <br>voluptate velit esse cillum dolore eu fugiat <br>nulla pariatur. Excepteur sint occaecat cupidatat<br> non proident, sunt in culpa qui <br>officia deserunt mollit anim id est laborum.</p>

            <a href="#" class="btn">Discover Now</a>
        </div>
    </section>

    <!--Car section-->

    <section class="cars" id="cars">
        <div class="heading">
            <span>All Cars</span>
            <h2>We have all types of cars</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem mollitia, doloribus modi nemo inventore nobis, nam delectus deleniti dolorum obcaecati minima labore tempora quam tenetur placeat? Eum exercitationem quisquam aperiam.</p>
        </div>
        <!--Container cars-->
        <div class="cars-container container">
            <!--container Box 1-->
            <div class="box">
                <img src="img/car1.jpg" alt="">
                <h2>Porsche Car</h2>
            </div>
            <!--container Box 2-->
            <div class="box">
                <img src="img/car2.jpg" alt="">
                <h2>Porsche Car</h2>
            </div>
            <!--container Box 3-->
            <div class="box">
                <img src="img/car3.jpg" alt="">
                <h2>Porsche Car</h2>
            </div>
            <!--container Box 4-->
            <div class="box">
                <img src="img/car4.jpg" alt="">
                <h2>Porsche Car</h2>
            </div>
            <!--container Box 5-->
            <div class="box">
                <img src="img/car5.jpg" alt="">
                <h2>Porsche Car</h2>
            </div>
            <!--container Box 6-->
            <div class="box">
                <img src="img/car6.jpg" alt="">
                <h2>Porsche Car</h2>
            </div>
        </div>
    </section>

    <!--About section-->
    <section class="about container" id="about">
        <div class="about-img">
            <img src="img/about.png" alt="">
        </div>
        <div class="about-text">
            <span>About us</span>
            <h2>Cheap Prices With <br> Quality Cars</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, debitis sequi. Quibusdam aperiam sequi voluptas reiciendis praesentium, eveniet est fugiat, mollitia officia ab dolor, nemo architecto alias amet natus quia?</p>

            <a href="#" class="btn">Learn More</a>
        </div>
    </section>
    <!--Blog section-->
     <section class="blog" id="blog">
        <div class="heading">
            <span>our Blog</span>
            <h2>Our Blog Content</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, fugit. Labore id est recusandae ab dolores voluptatem at earum explicabo voluptas reiciendis. Odit praesentium, officia voluptatum ullam accusamus id placeat?</p>
        </div>

        <!--Blog Container-->
        <div class="blog-container container">
            <!--Box 1-->
            <div class="box">
                <img src="img/car1.jpg" alt="">
                <span>March 20 2024 </span>
                <h3>How to Get the Perfect Car At a Low Price</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempora perferendis libero repellat repudiandae, sed optio deserunt magnam laudantium itaque quia mollitia saepe quam minima esse impedit nisi distinctio sapiente?</p>
                <a href="#" class="blog-btn">Read More <i class='bx bxs-hand-right'></i></a>
            </div>
            <!--Box 2-->
            <div class="box">
                <img src="img/car2.jpg" alt="">
                <span>March 20 2024 </span>
                <h3>How to Get the Perfect Car At a Low Price</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempora perferendis libero repellat
                    repudiandae, sed optio deserunt magnam laudantium itaque quia mollitia saepe quam minima esse impedit nisi
                    distinctio sapiente?</p>
                <a href="#" class="blog-btn">Read More <i class='bx bxs-hand-right'></i></a>
            </div>
            <!--Box 3-->
            <div class="box">
                <img src="img/car3.jpg" alt="">
                <span>March 20 2024 </span>
                <h3>How to Get the Perfect Car At a Low Price</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempora perferendis libero repellat
                    repudiandae, sed optio deserunt magnam laudantium itaque quia mollitia saepe quam minima esse impedit nisi
                    distinctio sapiente?</p>
                <a href="#" class="blog-btn">Read More <i class='bx bxs-hand-right'></i></a>
            </div>
        </div>
     </section>
     <!--Footer Section-->
     <section class="footer">
        <div class="footer-container container">
            <div class="footer-box">
               <a href="#" class="logo">Magari<span>Poa</a> 
                <div class="social">
                    <a href="#"><i class='bx bxl-facebook'></i></a>
                    <a href="#"><i class='bx bxl-twitter'></i></a>
                    <a href="#"><i class='bx bxl-instagram'></i></a>
                    <a href="#"><i class='bx bxl-youtube'></i></a>
                </div>
            </div>
            <div class="footer-box">
                <h3>Page</h3>
                <a href="#">Home</a>
                <a href="#">Cars</a>
                <a href="#">About</a>
                <a href="#">Our Blog</a>
            </div>
            <div class="footer-box">
                <h3>Legal</h3>
                <a href="#">Privacy Policy</a>
                <a href="#">Cookie Policy</a>
            </div>
            <div class="footer-box">
                <h3>Contact</h3>
                <P>Nairobi</P>
                <P>Thika</p>
                <p>Nyeri</p>
            </div>
        </div>
     </section>

     <!--Copyright Section-->
     <div class="copyright">
        <p>&#169; Magari poa All Rights Reserved</p>
     </div>

    <script src="script.js"></script>
</body>

</html>