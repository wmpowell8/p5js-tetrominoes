Idea: I'm a fan of modern T\*\*\*\*s, so I want to make a T\*\*\*\*s clone that incorporates features of modern games. I've made something like this before, using Python and the Pygame library. However the code style was kind of crappy. I want to make a better version using JavaScript.


Presenting Questions:

I'm a fan of T\*\*\*\*s, so it's natural for me to choose to make a T\*\*\*\*s clone for my final project. But more specifically I'm a fan of modern T\*\*\*\*s, so not only did I make a T****s clone, but the intracacies of modern titles are baked into this project. If you've ever played a modern T\*\*\*\*s game the mechanics of this project should feel the same. Heck, even games from as early as 2001 have most of the modern mechanics, with a few exceptions.
The framework for this project definitely took me a long time to code, but it made coding the rest of the project so much easier. But what gave me a lot of trouble was improper recognition of T-spins, one of the features of modern T\*\*\*\*s. I spent so much time creating debug tools and putting print statements in but in reality I just had to do the recognition before line clear detection and not after.
If I was given the chance to redo this project, I would definitely make the code less messy. The last time I made a T\*\*\*\*s clone, where I used the Python programming language and the Pygame library, it was a big mess of code that was hard to navigate, develop, and maintain. Some parts of this project ended up turning out like the other one, and if I were given a chance to redo this project, I would definitely try to prevent that from happening again. I would also incorporate a feature that I did not have time to implement: delays such as line clear delay and "ARE" ("ah-ray" / あれ).


It's worth noting that game overs are handled by throwing exceptions. For example if you clear 150 lines the game will throw the "You win" error.


Some questions you may have:
How do I control the game? See "const controls" below.
Why is clearing 4 lines at once using the I-tetromino called a "Quad" and not a "T\*\*\*\*s" like it's supposed to? A lot of fangames/clones don't call it a T\*\*\*\*s; I can only assume it's because of copyright infringement.
How are you able to obtain the information on how modern T\*\*\*\*s works? This info is freely avalible on various wikis and I know a lot of it by heart. It is avalible partially because of reverse-engineering and partially because of... dare I say it... leaked documents from the T\*\*\*\*s Company.