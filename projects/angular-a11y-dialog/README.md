# Angular A11yDialog 

This is a Angular wrapper component for [`a11y-dialog@7.3.0`](https://github.com/KittyGiraudel/a11y-dialog)

**Angular**

- [Install](#install)
- [Usage](#usage)
  - [Multiple dialogs](#multiple-dialogs)
- [API](#api)
- [Events](#events)
- [Slots](#slots)
- [Server-side Rendering](#server-side-rendering)

## Install

Note that `A11yDialog` is a peer dependency of `AngularA11yDialog`.

```bash
npm install angular-a11y-dialog a11y-dialog
```

## Usage

In your `app.module.ts` application module, in addition to whatever
you already have there, setup the `AngularA11yDialogModule`:

```ts
import { AngularA11yDialogModule } from 'angular-a11y-dialog';
@NgModule({
  ...
  imports: [AngularA11yDialogModule]
})
export class AppModule { }
```

### Angular Component

If you plan to utilize the `A11yDialog` instance, you'll need to import it:

```js
import { Component } from '@angular/core';
import A11yDialog from 'a11y-dialog';


@Component({
  selector: 'app-root',
  template: `
  <h1>Dialog Test</h1>
  <p>The following opens because we've assigned a dialog <code>ref</code>:</p>
  <button
    type="button"
    data-test-id="dialogRefBtn"
    (click)="openDialog()"
  >
    Open dialog via dialogRef
  </button>
  <p>The following opens because a11y-dialog uses the <code>data-a11y-dialog-show</code> data attribute:</p>
  <button
    type="button"
    data-test-id="dataA11yBtn"
    data-a11y-dialog-show="a11y-dialog"
  >
    Open the dialog via data attribute
  </button>
  <angular-a11y-dialog
    id="a11y-dialog"
    appRoot="#app"
    dialogRoot="#dialog-root"
    closeButtonPosition="last"
    (instance)="assignDialogInstance($event)"
  >
    <div closeButtonContentFirst>
      <span>Close (only appears if closeButtonPosition="first" but that's the default)</span>
    </div>
    <ng-template #titleTemplate>
      <span data-test-id="dialogTitle">A11yDialog Test</span>
    </ng-template>
    <div>
      <p>This is some content</p>
    </div>
    <div closeButtonContentLast>
      <span>Close (only appears if closeButtonPosition="last")</span>
    </div>
  </angular-a11y-dialog>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-a11y-tester';
  dialogInstance!: A11yDialog;
  openDialog() {
    this.dialogInstance.show();
  }
  assignDialogInstance(instance: A11yDialog) {
    this.dialogInstance = instance;
  };

}
```

_Note above we have two approaches to open the dialog:

1. Via the button with `data-a11y-dialog-show="a11y-dialog"` which `A11yDialog` will listen for.
2. Via the `A11yDialog` intance reference.

In your `index.html`, add a container where your dialog will be rendered into. In this case, notice the `dialog-root` element.

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="app"></div>
    <div id="dialog-root"></div>
  </body>
</html>
```

## API

> The `a11y-dialog` documentation is [here](https://a11y-dialog.netlify.app/)

### `id`

- **Property**: `id`
- **Type**: `String`
- **Required**: `true`
- **Description**: The unique HTML `id` attribute added to the dialog element, internally used by a11y-dialog to manipulate the dialog.
- **Usage**:

```html
<angular-a11y-dialog id="main-dialog">
  <!-- ... -->
</angular-a11y-dialog>
```

### `appRoot`

- **Property**: `appRoot`
- **Type**: `String`, `Array<String>` — CSS Selector string.
- **Required**: `true`
- **Description**: The selector(s) `a11y-dialog` needs to disable when the dialog is open.
- **Usage**:

```html
<angular-a11y-dialog appRoot="#app">
  <!-- ... -->
</angular-a11y-dialog>
```

### `dialogRoot`

- **Property**: `dialogRoot`
- **Type**: `String` — CSS Selector string.
- **Required**: `true`
- **Description**: The container for the dialog to be rendered into.
- **Usage**:

```html
<angular-a11y-dialog dialogRoot="#dialog-root">
  <!-- ... -->
</angular-a11y-dialog>
```

### `classNames`

- **Property**: `classNames`
- **Type**: `Object`
- **Required**: `false`
- **Default**: `{}`
- **Description**: Object of classes for each HTML element of the dialog element. Keys are: `base`, `overlay`, `document`, `title`, `closeButton`. 
- **Usage**:

```html
<angular-a11y-dialog classNames="{ base: 'base-class', overlay: 'overlay-class' }">
  <!-- ... -->
</angular-a11y-dialog>
```

### `titleId`

- **Property**: `titleId`
- **Type**: `String`
- **Required**: `false`
- **Default**: Defaults to `id + '-title'`.
- **Description**: The HTML `id` attribute of the dialog’s title element, used by assistive technologies to provide context and meaning to the dialog window.
- **Usage**:

```html
<angular-a11y-dialog titleId="main-title">
  <!-- ... -->
</angular-a11y-dialog>
```

### `closeButtonLabel`

- **Property**: `closeButtonLabel`
- **Type**: `String`
- **Required**: `false`
- **Default**: `'Close this dialog window'`
- **Description**: The HTML `aria-label` attribute of the close button, used by assistive technologies to provide extra meaning to the usual cross-mark.
- **Usage**:

```html
<angular-a11y-dialog closeButtonLabel="Close this super dialog">
  <!-- ... -->
</angular-a11y-dialog>
```

### `role`

- **Property**: `role`
- **Type**: `String`
- **Required**: `false`
- **Default**: `dialog`
- **Description**: The `role` attribute of the dialog element, either `dialog` (default) or `alertdialog` to make it a modal (preventing closing on click outside of <kbd>ESC</kbd> key).
- **Usage**:

```html
<angular-a11y-dialog role="alertdialog">
  <!-- ... -->
</angular-a11y-dialog>
```

## Events

### `instance`

- **Returns**: An `a11y-dialog` instance or `undefined`.
- **Description**: This event emits the `a11y-dialog` instance once the component has been initialised. When it gets `destroyed`, the event returns `undefined`. This is needed to call instance methods of the dialog, e.g. `this.dialog.show()`.
- **Usage**:

```html
<angular-a11y-dialog (instance)="assignDialogInstance($event)">
  <!-- ... -->
</angular-a11y-dialog>
```

You can obtain the instance reference and use:

```js
export class AppComponent {
  dialogInstance!: A11yDialog;
  openDialog() {
    this.dialogInstance.show();
  }
  assignDialogInstance(instance: A11yDialog) {
    this.dialogInstance = instance;
  };
}
```

## Slots


### `title`

- **Name**: `title`
- **Description**: The title element for the dialog; mandatory in the document to provide context to assistive technology. Could be [hidden with CSS](https://hugogiraudel.com/2016/10/13/css-hide-and-seek/) (while remaining accessible).
- **Usage**:

```html
<angular-a11y-dialog>
    <ng-template #titleTemplate>
      <span>Your title</span>
    </ng-template>
  <!-- ... -->
</angular-a11y-dialog>
```

### `closeButtonContentFirst`

- **Name**: `closeButtonContentFirst`
- **Description**: The inner HTML of the close button. By default `closeButtonPosition` is `first` so you will use this slot for the close button content. However, if you supply `last` or `none` for `closeButtonPosition` this slot will be ignored.
- **Usage**:

```html
<angular-a11y-dialog>
  <div closeButtonContentFirst>
    <span>Close (only appears if closeButtonPosition="first" but that's the default)</span>
  </div>
  <!-- ... -->
</angular-a11y-dialog>
```


### `closeButtonContentLast`

- **Name**: `closeButtonContentLast`
- **Description**: The inner HTML of the close button. By default `closeButtonPosition` is `first`, so unless you supply `last` for `closeButtonPosition` this slot will be ignored.
- **Usage**:

```html
<angular-a11y-dialog closeButtonPosition="last">
  <div closeButtonContentLast>
    <span>Close (only appears if closeButtonPosition="last")</span>
  </div>
  <!-- ... -->
</angular-a11y-dialog>
```

### `closeButtonPosition`

- **Name**: `closeButtonPosition`
- **Default**: `first`
- **Description**: One of `first`, `last`, or `none`
- **Usage**:

```html
<angular-a11y-dialog closeButtonPosition="last">
  <div closeButtonContentLast>
    <span>Close (only appears if closeButtonPosition="last")</span>
  </div>
  <!-- ... -->
</angular-a11y-dialog>
```
