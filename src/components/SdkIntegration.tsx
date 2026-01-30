"use client";

import { useState } from "react";


const Snippets = {
  React: (
    <>
      <p>
        <span className="text-purple-400">import</span>{" "}
        <span className="text-yellow-200">{"{ Speedify }"}</span>{" "}
        <span className="text-purple-400">from</span>{" "}
        <span className="text-green-300">'@speedify/react'</span>;
      </p>
      <p>&nbsp;</p>
      <p>
        <span className="text-purple-400">return</span> (
      </p>
      <p className="pl-4">
        {"<"}
        <span className="text-blue-300">Speedify</span>
      </p>
      <p className="pl-8">
        <span className="text-blue-200">apiKey</span>=
        <span className="text-green-300">"pk_live_..."</span>
      </p>
      <p className="pl-8">
        <span className="text-blue-200">onSuccess</span>=
        {"{(result) => console.log(result)}"}
      </p>
      <p className="pl-4">{"/>"}</p>
      <p>);</p>
    </>
  ),
  Vue: (
    <>
      <p>
        {"<"}
        <span className="text-purple-400">template</span>
        {">"}
      </p>
      <p className="pl-4">
        {"<"}
        <span className="text-blue-300">Speedify</span>
      </p>
      <p className="pl-8">
        <span className="text-blue-200">apiKey</span>=
        <span className="text-green-300">"pk_live_..."</span>
      </p>
      <p className="pl-8">
        <span className="text-blue-200">@success</span>=
        <span className="text-green-300">"handleSuccess"</span>
      </p>
      <p className="pl-4">{"/>"}</p>
      <p>
        {"</"}
        <span className="text-purple-400">template</span>
        {">"}
      </p>
      <p>&nbsp;</p>
      <p>
        {"<"}
        <span className="text-purple-400">script</span>
        {">"}
      </p>
      <p className="pl-4">
        <span className="text-purple-400">import</span>{" "}
        <span className="text-yellow-200">{"{ Speedify }"}</span>{" "}
        <span className="text-purple-400">from</span>{" "}
        <span className="text-green-300">'@speedify/vue'</span>;
      </p>
      <p>
        {"</"}
        <span className="text-purple-400">script</span>
        {">"}
      </p>
    </>
  ),
  Angular: (
    <>
      <p>
        <span className="text-purple-400">@Component</span>({"{"}
      </p>
      <p className="pl-4">
        <span className="text-blue-200">selector</span>:{" "}
        <span className="text-green-300">'app-root'</span>,
      </p>
      <p className="pl-4">
        <span className="text-blue-200">template</span>: `
      </p>
      <p className="pl-8">
        {"<"}
        <span className="text-blue-300">speedify-widget</span>
      </p>
      <p className="pl-12">
        [<span className="text-blue-200">apiKey</span>]="
        <span className="text-green-300">'pk_live_...'</span>"
      </p>
      <p className="pl-12">
        (<span className="text-blue-200">success</span>)="
        <span className="text-yellow-200">onSuccess</span>($event)"
        {">"}
      </p>
      <p className="pl-8">
        {"</"}
        <span className="text-blue-300">speedify-widget</span>
        {">"}
      </p>
      <p className="pl-4">`</p>
      <p>{"})"}</p>
      <p>
        <span className="text-purple-400">export class</span>{" "}
        <span className="text-yellow-200">AppComponent</span> {"{}"}
      </p>
    </>
  ),
  iOS: (
    <>
      <p>
        <span className="text-purple-400">import</span>{" "}
        <span className="text-blue-300">SpeedifySDK</span>
      </p>
      <p>&nbsp;</p>
      <p>
        <span className="text-purple-400">let</span> config ={" "}
        <span className="text-blue-300">SpeedifyConfig</span>(apiKey:{" "}
        <span className="text-green-300">"pk_live_..."</span>)
      </p>
      <p>
        <span className="text-blue-300">Speedify</span>.start(from:{" "}
        <span className="text-purple-400">self</span>, config: config){" "}
        {"{ result in"}
      </p>
      <p className="pl-4">
        print(<span className="text-green-300">"Verification success: \(result)"</span>)
      </p>
      <p>{"}"}</p>
    </>
  ),
  Android: (
    <>
      <p>
        <span className="text-purple-400">import</span>{" "}
        <span className="text-blue-300">com.speedify.sdk.Speedify</span>
      </p>
      <p>&nbsp;</p>
      <p>
        <span className="text-blue-300">Speedify</span>.start(
        <span className="text-purple-400">this</span>,{" "}
        <span className="text-green-300">"pk_live_..."</span>) {"{ result ->"}
      </p>
      <p className="pl-4">
        <span className="text-blue-300">Log</span>.d(
        <span className="text-green-300">"Speedify"</span>,{" "}
        <span className="text-green-300">"Success: $result"</span>)
      </p>
      <p>{"}"}</p>
    </>
  ),
  Flutter: (
    <>
      <p>
        <span className="text-purple-400">import</span>{" "}
        <span className="text-green-300">'package:speedify_sdk/speedify_sdk.dart'</span>;
      </p>
      <p>&nbsp;</p>
      <p>
        <span className="text-blue-300">Speedify</span>.start(
      </p>
      <p className="pl-4">
        <span className="text-blue-200">apiKey</span>:{" "}
        <span className="text-green-300">"pk_live_..."</span>,
      </p>
      <p className="pl-4">
        <span className="text-blue-200">onSuccess</span>: (result) {"=>"}{" "}
        print(result),
      </p>
      <p>);</p>
    </>
  ),
};

export const SdkIntegration = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof Snippets>("React");

  return (
    <section className="bg-speedify-green text-white py-24 px-6 rounded-[3rem] mx-4 md:mx-6 overflow-hidden relative shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-speedify-lime/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-block border border-speedify-lime/30 bg-speedify-lime/10 px-4 py-1.5 rounded-full text-xs font-mono mb-8 tracking-wide text-speedify-lime">
          SDK INTEGRATION
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Don't replace. Integrate.
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
          The code that connects your users to compliance. Add our SDK to your
          React, React Native, iOS, or Android app in under 30 minutes.
        </p>

        {/* Code Block */}
        <div className="bg-[#051F16]/80 backdrop-blur-md rounded-2xl p-6 text-left font-mono text-sm border border-white/10 max-w-2xl mx-auto shadow-2xl overflow-x-auto transform hover:scale-[1.01] transition-transform cursor-text group min-h-[300px] flex flex-col">
          <div className="flex gap-1.5 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="space-y-2 leading-relaxed flex-grow">
            {Snippets[activeTab]}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {/* Tech Stack Icons */}
          {(Object.keys(Snippets) as Array<keyof typeof Snippets>).map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveTab(tech)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all backdrop-blur-sm ${
                activeTab === tech
                  ? "bg-white text-speedify-green shadow-lg scale-105"
                  : "bg-white/5 border border-white/5 hover:bg-white/10 text-white"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
