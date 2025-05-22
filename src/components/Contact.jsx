import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import Icons from './Icons';
import { SendMail } from '../API/githubData';
import { motion as Motion } from 'motion/react';

const Contact = () => {
    const { register, handleSubmit, reset } = useForm();
    const [charLength, setCharLength] = useState(0);
    const [isDisable, setIsDisable] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const onSubmit = async (data) => {
        if (charLength <= 500) {
            setIsDisable(true);
            const response = await SendMail(data);
            if (response.success) {
                setIsDone(true);
            }
            setIsDisable(false);
            setCharLength(0);
            reset();
        }

    };
    
    const handleChange = useCallback ( (e) => {
        const message = e.target.value;
        setCharLength(message.length);
    },[]);

    return (

        <main>
            <section id='contact'>

                <Motion.div initial={{ y: 10 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: 'easeOut'} } className='contact-content'>
                    <h2>Contact me<span>.</span></h2>
                    <p>I’m always looking to grow, learn, and connect with others in tech. Got feedback, a tip, or an opportunity? I’d love to hear from you.</p>

                    <Motion.form initial={{ scale: 0.9 }} whileInView={{ scale: 1}}  viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: 'easeOut' }} onSubmit={handleSubmit(onSubmit)} className="contact-form">

                        <div className='name-email'>

                            <div className='name-container'>
                                <label htmlFor="name">Name<span>*</span></label>
                                <input id="name" {...register('name')} placeholder="Your Name" required />
                            </div>

                            <div className='email-container'>
                                <label htmlFor="email">Email<span>*</span></label>
                                <input id="email" {...register('email')} placeholder="d9@mail.com" type="email" required />
                            </div>

                        </div>

                        <div className='msg-container' >
                            <label htmlFor="message">Message<span>*</span></label>
                            <textarea onChangeCapture={handleChange} id="message" style={{ borderColor: charLength > 500 && '#dc2626' }} {...register('message')} placeholder="Your Message" required />
                            <p className='charLength' style={{ color: charLength > 500 && '#dc2626' }}>{charLength}/500 characters</p>
                        </div>

                        <button type="submit" className="sub-btn" disabled={isDisable}><Icons name={isDone ? 'done' : isDisable ? 'loading' : 'send'} className={'icon'} />Send</button>
                    </Motion.form>

                    <p>Or get in touch with me:</p>
                    <Motion.ul initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: 'easeOut'}}>
                        <li><Link to={'mailto:psathul073@gmail.com'}><Icons name={'gmail'} />Email <Icons name={'arrowRight'} className={'icon'} /> </Link></li>
                        <li><Link to={'https://www.instagram.com/d9.coder/'}><Icons name={'ig_c'} />Instagram <Icons name={'arrowRight'} className={'icon'} /> </Link></li>
                        <li><Link to={'https://www.facebook.com/people/D9-Coder/61572788624684/'}><Icons name={'fb'} />Facebook <Icons name={'arrowRight'} className={'icon'} /> </Link></li>
                        <li><Link to={'https://www.linkedin.com/in/athul-fullstack'}><Icons name={'linkedin_c'} />Linkedin <Icons name={'arrowRight'} className={'icon'} /> </Link></li>
                    </Motion.ul>

                </Motion.div>

            </section>
        </main>

    )
};

export default Contact