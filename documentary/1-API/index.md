## API

The package is available by importing its default function:

```js
import cors from '@goa/cors'
```

%~%

<typedef method="cors">types/api.xml</typedef>

<typedef>types/index.xml</typedef>

There are 3 main use cases:

**1. Accept any origin form the client**

%EXAMPLE: example, ../src => @goa/cors%
%FORK-js example%

**2. Send out only specific origin**

%EXAMPLE: example/origin, ../src => @goa/cors%
%FORK-js example/origin%

**3. Pre-flight Requests Via OPTIONS (both above apply)**

%EXAMPLE: example/pre-flight, ../src => @goa/cors%
%FORK-js example/pre-flight%

%~%