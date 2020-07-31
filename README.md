# Super-Password-Generator

# 

--

## **date here**

### My goal in this refactor:

### Execution:

- Steps for figuring out the generator:

1. 

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