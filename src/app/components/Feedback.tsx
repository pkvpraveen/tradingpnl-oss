import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { Button } from './Button';

const config = {
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSceQ0pUfWEMIsKA7wKPsFH6r6U5NuLpkbiIppIRxjmHrwgoiA/formResponse',
};

export default function Feedback() {
  const [email, setEmail] = useState('');
  const [broker, setBroker] = useState('');
  const [brokerOther, setBrokerOther] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState('');
  const spacing = 3;
  const validate = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!broker) {
      setError('Please select your broker');
      return false;
    }
    return true;
  };
  const doSubmit = async e => {
    e.preventDefault();
    setInProgress(true);
    if (!validate()) {
      return;
    }
    const formData = new FormData();
    formData.append('emailAddress', email);
    formData.append('entry.342600593', broker);
    formData.append('entry.342600593.other_option_response', brokerOther);
    formData.append('entry.238019908', answer);
    formData.append('entry.1686466035', message);
    await fetch(config.formUrl, {
      method: 'post',
      body: formData,
    })
      .then(response => {
        setSubmitted(true);
        setInProgress(false);
      })
      .catch(err => {
        console.log('err', err);
        setSubmitted(true);
        setInProgress(false);
      });
  };
  return (
    <Box width={'50%'} mx={'auto'} p={5}>
      <Card>
        <CardHeader title={'Lets make our tool better 🔥'} />
        {submitted ? (
          <CardContent>
            <Typography>Thank you for your support!</Typography>
          </CardContent>
        ) : (
          <CardContent>
            <Box p={2}>
              <Typography color="secondary">{error}</Typography>
            </Box>
            <form autoComplete="off" onSubmit={doSubmit}>
              <Box>
                <TextField
                  label="Email"
                  value={email}
                  type="email"
                  fullWidth
                  required
                  variant="outlined"
                  onChange={e => setEmail(e.target.value)}
                />
              </Box>
              <Box mt={spacing}>
                <FormControl required>
                  <Box my={1}>
                    <FormLabel>Which broker are you using?</FormLabel>
                  </Box>
                  <Box pl={1}>
                    <RadioGroup
                      aria-label="broker"
                      name="broker"
                      value={broker}
                      row
                      onChange={e => setBroker(e.target.value)}
                    >
                      <Box mt={1} mr={2}>
                        <FormControlLabel
                          value="Upstox"
                          control={<Radio />}
                          label="Upstox"
                        />
                      </Box>
                      <Box mt={1} mr={2}>
                        <FormControlLabel
                          value="Angel"
                          control={<Radio />}
                          label="Angel"
                        />
                      </Box>
                      <Box mt={1}>
                        <FormControlLabel
                          value="__other_option__"
                          control={<Radio />}
                          label="Other"
                        />
                      </Box>
                    </RadioGroup>
                  </Box>
                </FormControl>
                <Box mt={1}>
                  {broker === '__other_option__' && (
                    <TextField
                      label="Please specify the broker"
                      fullWidth
                      variant="outlined"
                      value={brokerOther}
                      onChange={e => setBrokerOther(e.target.value)}
                    />
                  )}
                </Box>
              </Box>
              <Box mt={spacing}>
                <TextField
                  label="How can we make this tool more awesome?"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                />
              </Box>
              <Box mt={spacing}>
                <TextField
                  label="Anything you want to say to the creator of this tool?"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </Box>
              <Box mt={spacing}>
                {!submitted && (
                  <Button disabled={inProgress}>
                    {inProgress ? 'Submitting...' : 'Submit'}
                  </Button>
                )}
              </Box>
            </form>
          </CardContent>
        )}
      </Card>
    </Box>
  );
}
