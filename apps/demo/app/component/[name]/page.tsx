import { getComponentByName } from "../../../libs/mcp";
import { notFound } from "next/navigation";
import Link from "next/link";
import CopyButton from "./CopyButton";

type Component = {
  code: {
    tsx: string;
    css?: string;
  };
  metadata: {
    name: string;
    version: string;
    tags?: string[];
    themes?: string[];
  };
};

export default async function ComponentPage({
  params,
}: {
  params: { name: string };
}) {
  const component: Component | null = await getComponentByName("shadcn", params.name);

  if (!component) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Components
          </Link>
          
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {component.metadata.name.split('-').map((word: string) => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </h1>
          
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              v{component.metadata.version}
            </span>
            {component.metadata.themes?.map((theme: string) => (
              <span 
                key={theme}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Component Code */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Component Code</h2>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                <span className="text-gray-300 text-sm font-medium">
                  {component.metadata.name}.tsx
                </span>
                <CopyButton 
                  text={component.code.tsx} 
                  filename={`${component.metadata.name}.tsx`}
                />
              </div>
              
              <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                <code>{component.code.tsx}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* CSS Code (if available) */}
        {component.code.css && (
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">CSS Styles</h2>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                  <span className="text-gray-300 text-sm font-medium">
                    styles.css
                  </span>
                  <CopyButton 
                    text={component.code.css || ""} 
                    filename="styles.css"
                  />
                </div>
                
                <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                  <code>{component.code.css}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
