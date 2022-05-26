import React from 'react';
import { useDesign } from '../hooks/design.hook';
import { BurgerMenu } from '../components/BurgerMenu';
import { DesignPanel } from '../components/DesignPanel';
import { DesignMenu } from '../components/DesignMenu';
import Design from '../components/Design';
import './main.css';
import './authPage.css';

export default function CreateProjectPage() {
  const {
    setScene,
    refControls,
    target,
    mode,
    scene,
    texture,
    handleExport,
    loadFromFile,
    handleLoad,
    setTarget,
  } = useDesign();

  return (
    <div className="main-page">
      <BurgerMenu />
      <section className="content-wrapper">
        <DesignMenu />
        <h2>Создать проект</h2>
        <DesignPanel
          scene={scene}
          handleLoad={handleLoad}
          loadFromFile={loadFromFile}
          handleExport={handleExport}
        />
        <div className="content">
          <Design
            setScene={setScene}
            refControls={refControls}
            target={target}
            scene={scene}
            mode={mode}
            texture={texture}
            setTarget={setTarget}
          />
        </div>
      </section>
    </div>
  );
}
