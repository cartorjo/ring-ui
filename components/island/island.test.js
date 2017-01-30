import 'dom4';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument, isCompositeComponentWithType} from 'react-addons-test-utils';
import React from 'react';
import Island, {AdaptiveIsland, Content, Header} from './island';
import styles from './island.css';

describe('Island', () => {
  const renderComponent = params => renderIntoDocument(<Island {...params}/>);

  it('should create Island component', () => {
    isCompositeComponentWithType(renderComponent(), Island).should.be.true;
  });

  it('should wrap children with div', () => {
    findDOMNode(renderComponent()).should.match('div');
  });

  it('should use passed className', () => {
    findDOMNode(renderComponent({className: 'test-class'})).should.match('.test-class');
  });

  describe('AdaptiveIsland', () => {
    it('should render AdaptiveIsland', () => {
      isCompositeComponentWithType(renderIntoDocument(<AdaptiveIsland/>), AdaptiveIsland).should.be.true;
    });

    it('should change header size if content is scrolled', () => {
      const instance = renderIntoDocument(<AdaptiveIsland>
        <Header/>
        <Content/>
      </AdaptiveIsland>);

      const headerNode = findDOMNode(instance).querySelector('[data-test="ring-island-header"]');

      instance.onContentScroll({scrollTop: 8});
      headerNode.style.lineHeight.should.equal('36px');
    });
  });

  describe('Header', () => {
    it('should render header', () => {
      isCompositeComponentWithType(renderIntoDocument(<Header/>), Header).should.be.true;
    });

    it('should change header size', () => {
      const size = 22;
      const node = findDOMNode(renderIntoDocument(<Header size={size}/>));
      node.style.lineHeight.should.equal(`${size}px`);
    });

    it('should change header title font size', () => {
      const size = 24;
      const titleNode = findDOMNode(renderIntoDocument(<Header size={size}/>)).querySelector(`.${styles.title}`);
      titleNode.style.fontSize.should.equal('6.4px');
    });
  });
});
