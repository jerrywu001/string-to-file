<!-- eslint-disable vue/no-v-html -->
<template>
  <main class="main">
    <div v-if="result" class="result block">
      <div class="sub-title">converted:</div>
      <pre class="">
        <code class="hljs" v-html="result" />
      </pre>
    </div>

    <div class="block">
      <div class="title">Json to file</div>
      <div class="content">
        <pre>
          <code class="hljs" v-html="jsonHtml" />
        </pre>
        <div style="display: flex;">
          <div class="button" @click="_ => convert('json')">convert</div>
          <div class="button download" @click="_ => download('json')">download</div>
        </div>
      </div>
    </div>

    <div class="block">
      <div class="title">Json to base64</div>
      <div class="content">
        <pre>
          <code class="hljs" v-html="jsonHtml" />
        </pre>
        <div style="display: flex;">
          <div class="button" @click="doJsonToBase64">convert</div>
        </div>
      </div>
    </div>

    <div class="block">
      <div class="title">string to file</div>
      <div class="content">
        <pre>
          <code class="hljs" v-html="stringHtml" />
        </pre>
        <div style="display: flex;">
          <div class="button" @click="_ => convert('string')">convert</div>
          <div class="button download" @click="_ => download('string')">download</div>
        </div>
      </div>
    </div>

    <div class="block">
      <div class="title">string to base64</div>
      <div class="content">
        <pre>
          <code class="hljs" v-html="stringHtml" />
        </pre>
        <div style="display: flex;">
          <div class="button" @click="doStringToBase64">convert</div>
        </div>
      </div>
    </div>

    <div class="block">
      <div class="title">js to file</div>
      <div class="content">
        <pre>
          <code class="hljs" v-html="jsHtml" />
        </pre>
        <div style="display: flex;">
          <div class="button" @click="_ => convert('js')">convert</div>
          <div class="button download" @click="_ => download('js')">download</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';
import { stringToFile, saveFile, jsonToBase64, stringToBase64 } from 'string-to-file';
import { onMounted, ref, nextTick } from 'vue';
import 'highlight.js/styles/github.css';

const json = { name: 'jack', age: 12 };
const string = `Hello world!

How are you!`;
const jsString = `const a = 'Hello world!';

console.log(a);`;

const result = ref('');
const jsonHtml = ref('');
const jsHtml = ref('');
const stringHtml = ref('');

const getFileJson = (file: File) => ({
  lastModified: file.lastModified,
  // @ts-ignore
  lastModifiedDate: file.lastModifiedDate,
  name: file.name,
  size: file.size,
  type: file.type,
  webkitRelativePath: file.webkitRelativePath,
});

const doJsonToBase64 = async () => {
  const base64 = await jsonToBase64(json) as string;
  console.log(base64);
  result.value = hljs.highlight(base64, { language: 'txt' }).value;
};

const doStringToBase64 = async () => {
  const base64 = await stringToBase64(string) as string;
  console.log(base64);
  result.value = hljs.highlight(base64, { language: 'txt' }).value;
};

const convert = async (type = 'json') => {
  let file: File | null = null;
  if (type === 'json') {
    file = stringToFile(JSON.stringify(json, null, 2), 'test.json');

    result.value = hljs.highlight(JSON.stringify(getFileJson(file), null, 2), { language: 'json' }).value;
  }

  if (type === 'string') {
    file = stringToFile(string, 'test.txt');

    result.value = hljs.highlight(JSON.stringify(getFileJson(file), null, 2), { language: 'txt' }).value;
  }

  if (type === 'js') {
    file = stringToFile(jsString, 'test.js');

    result.value = hljs.highlight(JSON.stringify(getFileJson(file), null, 2), { language: 'javascript' }).value;
  }

  console.log('Converted: ', file);
  return file;
};

const download = (type = 'json') => {
  let file: File | null = null;
  if (type === 'json') {
    file = stringToFile(JSON.stringify(json, null, 2), 'test.json');
    saveFile(file);
  }

  if (type === 'string') {
    file = stringToFile(string, 'test.txt');
    saveFile(file);
  }

  if (type === 'js') {
    file = stringToFile(jsString, 'test.js');
    saveFile(file);
  }
};

onMounted(() => {
  nextTick(() => {
    jsonHtml.value = hljs.highlight(JSON.stringify(json, null, 2), { language: 'json' }).value;
    jsHtml.value = hljs.highlight(jsString, { language: 'javascript' }).value;
    stringHtml.value = hljs.highlight(string, { language: 'txt' }).value;
  });
});
</script>

<style>
.block {
  border: 1px #ddd dashed;
  margin: 26px;
  padding: 16px;
  border-radius: 8px;
}

.hljs {
  border-radius: 6px;
  padding: 0 !important;
}

.title {
  font-style: italic;
  font-size: 16px;
  font-weight: 600;
}

.button {
  background-color: #136dd1;
  color: #fff;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 6px;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 6px;
}

.button:hover {
  background-color: #07386e;
}

.button.download {
  background-color: #27bc24;
  font-size: 14px;
}

.button.download:hover {
  background-color: #158412;
}

.result {
  padding: 0 12px;
}

.sub-title {
  font-size: 14px;
  font-weight: 700;
  padding: 12px 0 0 0;
}

pre {
  margin: 0;
}
</style>
