import React from 'react';
import { Backpack, Scale, Shield, Compass, Sparkles } from 'lucide-react';

export const GearLockerView: React.FC = () => {
  const gearCategories = [
    {
      name: 'Alpine Traverse (Summer Ultralight)',
      baseWeight: '11.4 lbs base weight',
      items: [
        { item: 'Hyperlite Mountain Gear 2400 Junction Pack', weight: '29.8 oz' },
        { item: 'Enlightened Equipment Revelation 20° Quilt', weight: '22.4 oz' },
        { item: 'Nemo Tensor Insulated Sleeping Pad', weight: '15.0 oz' },
        { item: 'MSR PocketRocket Deluxe Stove & Titan Kettle', weight: '7.8 oz' },
        { item: 'Sawyer Squeeze Micro Water Filter & Cnoc Bag', weight: '5.2 oz' },
      ],
    },
    {
      name: 'High Ridge Scramble & Snow Safety',
      baseWeight: 'Technical Kit',
      items: [
        { item: 'Kahtoola MICROspikes Traction Footwear', weight: '11.9 oz' },
        { item: 'Petzl Glacier LiteRide Ice Axe (50cm)', weight: '11.3 oz' },
        { item: 'Black Diamond Trail Pro Shock Poles', weight: '19.2 oz' },
        { item: 'Garmin inReach Mini 2 Satellite Communicator', weight: '3.5 oz' },
        { item: 'Petzl Actik Core Headlamp (450 Lumens)', weight: '2.6 oz' },
      ],
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-[#E8EFEA] text-[#1B4332]">
            <Backpack className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-[#14261C]">
              Alpine Gear Locker
            </h2>
            <p className="text-xs text-[#526357]">
              Curated gear checklists and weighed pack systems for Cascades adventures.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gearCategories.map((cat, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#E8E2D5] bg-[#FAF8F5]">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#EDE7DC]">
                <h3 className="text-sm font-serif font-bold text-[#14261C]">
                  {cat.name}
                </h3>
                <span className="text-[11px] font-mono text-[#1B4332] font-semibold">
                  {cat.baseWeight}
                </span>
              </div>
              <ul className="mt-3 space-y-2 text-xs">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-center justify-between text-[#384A3E]">
                    <span className="truncate pr-2">{item.item}</span>
                    <span className="font-mono text-[11px] text-[#718476] shrink-0">
                      {item.weight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
