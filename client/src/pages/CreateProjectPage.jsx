import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDesign } from '../hooks/design.hook';
import { BurgerMenu } from '../components/BurgerMenu';
import { DesignPanel } from '../components/DesignPanel';
import { DesignMenu } from '../components/DesignMenu';
import Design from '../components/Design';
import './main.css';
import './authPage.css';

export default function CreateProjectPage() {
  const { id } = useParams();
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
    handleLoadFullScene,
    loadSceneById,
    saveScene,
  } = useDesign();

  useEffect(() => {
    if (id) {
      loadSceneById(id);
    }
  }, [id]);

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
          handleLoadFullScene={handleLoadFullScene}
          saveScene={saveScene}
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
