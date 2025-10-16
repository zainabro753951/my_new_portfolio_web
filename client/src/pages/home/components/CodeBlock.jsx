// CodeBlock.jsx
import React from 'react'

const highlightCode = code => {
  // Step 1: Escape HTML tags
  let html = code.replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // Step 2: Strings (double/single quotes)
  html = html.replace(/("[^"]*"|'[^']*')/g, `<span class="text-green-500">$1</span>`)

  // Step 3: Keys followed by colon (like object keys)
  html = html.replace(/(\b\w+\s*):/g, `<span class="text-cyan-500">$1</span>:`)

  // Step 4: Brackets with alternating colors
  const bracketColors = ['text-green-400', 'text-blue-400', 'text-purple-400']
  let bracketIndex = 0
  html = html.replace(/[\{\}\[\]\(\)]/g, match => {
    const color = bracketColors[bracketIndex % bracketColors.length]
    bracketIndex++
    return `<span class="${color}">${match}</span>`
  })

  // Step 5: Highlight the `class` keyword (AFTER everything else)
  html = html.replace(/(\bclass\b)(?![^<]*>)/g, `<span class="text-purple-600 font-bold">$1</span>`)

  return html
}

const CodeBlock = ({ code }) => {
  return (
    <div className="bg-theme-dark text-white md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] border border-theme-cyan md:p-[1vw] sm:p-[1.5vw] xs:p-[2vw] shadow-lg w-full mx-auto code-block">
      <pre>
        <code
          className="font-fira-code md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] leading-0.5 whitespace-pre font-light"
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />
      </pre>
    </div>
  )
}

export default CodeBlock
