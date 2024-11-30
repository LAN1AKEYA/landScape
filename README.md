# landScape

<a href=""><b>Russian README</b></a>

landScape is a simple library for creating design elements consisting of dynamic lines that react to the movement of the user's cursor.

Currently, this library is in testing mode. The main engine has sufficient functionality and no critical errors, unlike the configuration editor, which cannot fully implement all the engine's features. Nevertheless, I plan to address many of these shortcomings in the future.

## Library Structure

This section presents all the files of the library.

### Files to Interact With

1. generator.html - configuration editor that can be used to draw an element.
2. config.json - configuration file. Place all the elements you have drawn into this file.

### Files Not to Interact With

The files in the dev folder should not be modified.

Here you can find:

1. configScript.js - file responsible for the operation of the configuration editor.
2. configStyle.css - file responsible for the styling of the configuration editor.
3. engine.js - the main engine that takes values from config.json and processes element animations in real-time.
4. template.json - currently a useless file. In the future, it is planned to implement template loading for generator.html from this file.

## Connecting the Library

Connecting the library is quite simple. To do this, you need to connect engine.js to the index file.

    <script src="landScape/dev/engine.js"></script>

After that, you can draw new elements and add them to config.json.

## Creating New Elements

To create a new element, you can use the specially created configuration editor generator.html (hereafter referred to as the generator).

### Generator Interface

On the left side of the screen is the work panel where you can change some parameters.

#### List of Parameters

<table> <tr> <td> father id </td> <td> identifier of the HTML element inside which the created element will be placed </td> </tr> <tr> <td> width </td> <td> line width </td> </tr> <tr> <td> height </td> <td> line height </td> </tr> <tr> <td> gap </td> <td> spacing between lines </td> </tr> <tr> <td> radius </td> <td> line rounding </td> </tr> <tr> <td> cols </td> <td> number of columns </td> </tr> <tr> <td> rows </td> <td> number of rows </td> </tr> </table>

Below is a text field where the object ready to be sent to config.json is placed.

At the very bottom are the buttons:

<table> <tr> <td> clear </td> <td> clear the canvas (refreshing the page has the same effect) </td> </tr> <tr> <td> copy </td> <td> quick copy of the object from the text field to the clipboard </td> </tr> </table>

#### Main Work Area

Most of the page is occupied by the work area where you can draw lines. Currently, lines can only be drawn from top to bottom. You can draw lines and change parameters in the control panel simultaneously without causing any errors.

When you finish drawing the element, you can press the copy button and proceed to the next step.

### Saving the Configuration

After copying the newly created element, you can place it inside config.json. To do this, simply open this file and insert the new object as an element of the global array. If you have multiple elements, don't forget to separate them with commas!

### Future Plans

Currently, the project is in its early stages. The main changes I am working on:

1. Expanding the generator's functionality and fixing critical bugs. Adding basic graphic editor tools such as an eraser, undo/redo buttons, etc.
2. Adding the ability to color lines in any colors.
3. Adding the ability to use other units of measurement, such as vw or %.
4. Adding the ability to insert an object into the text field for editing.