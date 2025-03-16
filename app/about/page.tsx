// app/about/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* 头部大图 */}
      <section className="relative h-95">
        <div 
          className="absolute inset-0 bg-cover opacity-20"
          style={{ 
            backgroundImage: "url('https://live.staticflickr.com/8491/8298064531_7837611209_b.jpg')" ,
            backgroundPosition: 'center 70%', // 垂直方向从70%位置开始显示
          }}
        />

        <div className="absolute inset-0 bg-black/60" />  

        <div className="relative absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10 pt-32">
            <h1 className="text-4xl md:text-6xl font-chinese text-white mb-6 my-5">
              About this website
            </h1>
            <p className="text-xl text-white opacity-90">
              something else
            </p>
          </div>
        </div>
      </section>

      {/* 核心使命 */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/Seasoning.png"
              alt="Seasoning"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-chinese text-red-800 mb-4">Our Mission</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                Building a digital bridge between Chinatown supermarkets and home kitchens to demystify traditional Chinese ingredients.
              </p>
              <div className="pl-4 border-l-4 border-red-600">
                <p className="text-gray-600 italic">
                  “Re-understanding seasonings through the lens—making each spice a cultural ambassador”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 两大核心功能 */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-chinese text-center text-red-800 mb-12">Core Features</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <FeatureCard
              icon="📸"
              title="Chinese Products Scanner"
              content="Real-time analysis of Chinese specialty products, providing Benefits, Categories, etc. Even how to cook it!"
            />
            <FeatureCard
              icon="🥢"
              title="Restaurant Finder"
              content="From spicy to sweet, intelligently match the best restaurants and recipes for you"
            />
          </div>
        </div>
      </section>

      {/* 文化价值 */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-chinese text-center text-red-800 mb-12">创造的价值</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">文化传承</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>数字化保存传统烹饪技法</li>
                <li>每道菜背后的历史典故可视化呈现</li>
                <li>连接三代厨艺传承人的故事地图</li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">社区支持</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>为家庭餐馆增加30%客流量</li>
                <li>特色食材供应商数字名录</li>
                <li>每月文化主题餐饮活动日历</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 独特优势 */}
      <section className="py-16 bg-red-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-chinese text-center text-red-800 mb-12">我们的不同</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <AdvantageItem 
              title="深度文化连接"
              content="不只是菜谱，更讲述每道菜背后的移民故事与文化迁徙轨迹"
            />
            <AdvantageItem
              title="智能风味匹配"
              content="基于机器学习分析您的味觉偏好，推荐最适合的餐馆与烹饪方案"
            />
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/discover"
              className="bg-red-800 text-yellow-100 px-8 py-3 rounded-full 
                       hover:bg-red-700 transition-colors font-chinese text-lg"
            >
              立即开启美食探索
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// 功能卡片组件
function FeatureCard({ icon, title, content }: { icon: string, title: string, content: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}

// 优势项组件
function AdvantageItem({ title, content }: { title: string, content: string }) {
  return (
    <div className="bg-white p-6 rounded-lg border-l-4 border-red-600">
      <h3 className="text-xl font-semibold text-red-800 mb-2">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}