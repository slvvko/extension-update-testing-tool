// Copyright 2023 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const path = require("path");

/**
 * Artificial delay to simulate network/server delays when downloading the extension
 */
const EXTENSION_DOWNLOAD_DELAY_MS = 40 * 1000;

module.exports = (_, res) => {
  console.log(`[Extension Download] Artificial delay: ${EXTENSION_DOWNLOAD_DELAY_MS} ms`);

  // Add artificial delay to simulate real-world scenarios where extension download
  // takes time, which can affect when onUpdateAvailable fires
  setTimeout(() => {
    console.log("[Extension Download] Serving extension.crx");
    res.setHeader("Content-Type", "application/x-chrome-extension");
    res.sendFile(path.resolve("tmp/extension.crx"));
  }, EXTENSION_DOWNLOAD_DELAY_MS);
};
