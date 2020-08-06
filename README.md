# Super-Password-Generator

# 

--

## **date here**

### My goal in this refactor:

### Execution:

- Steps for figuring out the generator:

- I initially wanted to loop through the generated password to double check that all of the requirements (capitals, special characters, numbers) were there.
I realized that logging the index of the requirement when they are added to the password and then making sure that they haven't been generated over would be a faster solution (albeit harder to program)
- During this I found out that strings are immutable (very frustrating, there is no error log when trying to change an immutable string!) and had to create a workaround using substring. The generator now ALWAYS has 1 of the requirement you ask for; it never overwrites a req with another req.


### Features:

### Noteworthy:

- A lot of methods which reference a function also call the function for some reason...

For example, this would call the function:

```js
generateBtn.addEventListener("click", initializeGeneration());
```

This would not:

```js
generateBtn.addEventListener("click", function () {
  initializeGeneration();
});
```

- I had a problem with an undefined error when choosing a new letter for my character style generator. It was hard to debug! I realized that just running it step by step into a calculator was the best way to figure out the issue, and I soon realized that I was counting up to 27 letters instead of 26.